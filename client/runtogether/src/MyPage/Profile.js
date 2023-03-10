import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Progress, Divider, useDisclosure,
  Modal, ModalOverlay, ModalHeader, ModalBody,
  ModalFooter, ModalContent, ModalCloseButton,
  Button, Input, Stack, Radio, Slider,
  SliderTrack, SliderFilledTrack,
  Tooltip, SliderThumb, RadioGroup
} from '@chakra-ui/react';
import DaumPostcode from 'react-daum-postcode';
import axioswithH from '../api/axios';
import axios from 'axios';
import Hashtag from '../CreateFeed/HashTag'

function UpsideProfile() {
  const { isOpen: isAddressOpen, onOpen: onAddressOpen, onClose: onAddressClose } = useDisclosure()

  const [isModifyMode, setIsModifyMode] = useState(false);
  const [file, setFile] = useState(null);
  const [profileImg, setProfileImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [userId, setUserId] = useState();
  const [level, setLevel] = useState();
  const [name, setName] = useState();
  const [nickname, setNickname] = useState();
  const [experience, setExperience] = useState();
  const [gender, setGender] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [address, setAddress] = useState();
  const [age, setAge] = useState();
  const [fileUrl, setFileUrl] = useState();
  const fileInput = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false)

  const [selectedHashtagsId, setSelectedHashtagsId] = useState(new Set());
  const [selectedHashtagsName, setSelectedHashtagsName] = useState(new Set());
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("access-token") === null) { // 비회원 -> 로그인
        window.location.replace("/user/login");
    }
    
    (async () => { 
      
      const data = await axioswithH({
          url: '/user',
          method: "GET"
      });
      // console.log(data.data.data)
      setUserId(data.data.data.userId)
      setNickname(data.data.data.userNickname)
      setName(data.data.data.userName)
      setLevel(data.data.data.level)
      setExperience(data.data.data.experience)
      setGender(data.data.data.gender)
      setPhoneNum(data.data.data.phoneNum)
      setAddress(data.data.data.address)
      setAge(data.data.data.age)
      setHashtags(data.data.data.hashtags)
      setProfileImg("http://i8a806.p.ssafy.io/runstory/user/"+data.data.data.profileImgFileName)
      setFileUrl("http://i8a806.p.ssafy.io/runstory/user/"+data.data.data.profileImgFileName)
      
      let hashtagDict = {};
      const res = await axios({url: 'https://i8a806.p.ssafy.io/api/feed/hashtag', method: "GET"});
      res.data.data.map((v)=>{
        // console.log(v)
        hashtagDict[v.hashtagId] = v.hashtagName;
      })

      var temp = "";
      data.data.data.hashtags.map((hashtag)=>{
        temp += hashtagDict[hashtag] + " / "
      })

      temp = temp.slice(0, -3);
      setSelectedHashtagsName(temp);
    })();

  }, [selectedHashtagsId]);
  

  // 프로필 사진 변경
  const imgChange = (e) => {
    if(e.target.files[0]){
        setFile(e.target.files[0])
    } else{ //업로드 취소할 시
        setProfileImg("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
        return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
        if(reader.readyState === 2){
            setProfileImg(reader.result)
        }
    }
    reader.readAsDataURL(e.target.files[0])
    // console.log(e.target.files[0])
  }

  // 수정모드 전환
  function modeChange() {
    if(isModifyMode) {
      const formData = new FormData();
        formData.append('userId', userId);
        // formData.append('userPwd', password);
        formData.append('userName', name);
        formData.append('userNickname', nickname);
        // formData.append('emailAuth', true);
        formData.append('phoneNum', phoneNum);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('age', age);
        // formData.append('roleType', "USER");
        // formData.append('regType', "LOCAL");
        formData.append('hashtags', Array.from(selectedHashtagsId));
        formData.append('profileImg', file);
        const data = axioswithH({
            url: 'https://i8a806.p.ssafy.io/api/user',
            // url: 'http://localhost:8080/user',
            method: "PUT", data: formData,
            headers: { 'Content-Type': 'multipart/form-data' } 
        });
        
        window.location.reload();
    }
    setIsModifyMode(!isModifyMode)
  }
        
  async function delAccount() {
      const data = await axioswithH({
        url: '/user',
        method: "DELETE"
    });  
  }

  const handleNicknameChange = ({ target: { value } }) => setNickname(value);
  const handleNameChange = ({ target: { value } }) => setName(value);
  const handlePhoneNumChange = ({ target: { value } }) => setPhoneNum(value);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    // console.log(data);
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    var addressInput = document.getElementById('address-input');
    addressInput.placeholder = fullAddress;
    onAddressClose();
  };

  const handleSearch = (data) => {
    // console.log(data);
  };

  return (<>
      <Modal isOpen={isAddressOpen} onClose={onAddressClose} size='xs' isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>주소 검색</ModalHeader>
            <ModalCloseButton />
            <ModalBody style={{margin: '0 auto', width: '100%', overflow: 'scroll'}}>
                <div style={{overflow: 'scroll', fontSize: '12px'}}>
                    <DaumPostcode className="postmodal" onComplete={handleComplete} onSearch={handleSearch}></DaumPostcode>
                </div>
            </ModalBody>
        </ModalContent>
    </Modal>
      {isModifyMode?
      <form>
      <div>
      <div style={{display: 'flex', margin: '0 auto', height: '15vh'}}>
        <div style={{textAlign: 'left', width: "30%", marginLeft: "5%", lineHeight: '15vh'}}>
          <Avatar 
              src={profileImg}
              isCentered
              size={'xl'}
              onClick={()=>{fileInput.current.click()}}/>
          <input 
              type='file' 
              style={{display:'none'}}
              accept='image/jpg,impge/png,image/jpeg' 
              name='profile_img'
              onChange={imgChange}
              ref={fileInput}/>
        </div>
        <div style={{display: 'block', width: "60%", fontSize: '10px'}}>
          <div style={{display: "flex", justifyContent: "start", width: "100%", marginLeft: "5%", height: '40%', marginTop: '5%'}}>
            <div style={{fontSize: "19px", marginTop: '5%'}}>
              {userId}
            </div>
          </div>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <div>Exp. </div>
            <Progress hasStripe size='lg' value={experience/1000} colorScheme={'pink'} style={{width: '70%', borderRadius: '10px', marginTop: '2.5%', marginLeft: '3%'}}/>
          </div>
          <div style={{textAlign: 'right', marginRight: '10%', fontSize: '12px'}}>Lv.{level}&nbsp;&nbsp;&nbsp;{experience}/100000</div>
        </div>
      </div>
      <Divider style={{marginTop: '3%', marginBottom: '7%', width: '90%', marginLeft: '5%'}}></Divider>
      <div style={{marginLeft: '5%', marginRight: '5%'}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>아이디</div>
          <div style={{width: '40%', marginLeft: '15%'}}>{userId}</div>
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>닉네임</div>
          <input style={{width: '40%', marginLeft: '15%', border: '1px solid #6a6a6a', borderRadius: '10px'}} value={nickname} onChange={handleNicknameChange}/>
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>이름</div>
          <input style={{width: '40%', marginLeft: '15%', border: '1px solid #6a6a6a', borderRadius: '10px'}} value={name} onChange={handleNameChange} />
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '22%', textAlign: 'left'}}>성별</div>
          <div style={{width: '40%', marginLeft: '15%'}}>
            <RadioGroup onChange={setGender} value={gender=="1"?"1":"2"} mb={2}>
                <Stack direction='row'>
                    <Radio value='1' size='sm' colorScheme={"pink"}>남성</Radio>
                    <Radio style={{marginLeft: '10px'}} value='2' size='sm' colorScheme={"pink"}>여성</Radio>
                </Stack>
            </RadioGroup>
          </div>
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>나이</div>
          <div style={{width: '40%', marginLeft: '15%'}}>
          <Slider
                w='100%'
                textAlign={'left'}
                id='slider'
                defaultValue={age}
                min={0}
                max={100}
                colorScheme='pink'
                onChange={(v) => setAge(v)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                    hasArrow
                    bg='teal.500'
                    color='white'
                    placement='top'
                    isOpen={showTooltip}
                    label={`${age} 세`}
                >
                <SliderThumb />
                </Tooltip>
            </Slider>
            {age} 세
          </div>
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>핸드폰 번호</div>
          <input style={{width: '40%', marginLeft: '15%', border: '1px solid #6a6a6a', borderRadius: '10px'}} value={phoneNum} type="tel" onChange={handlePhoneNumChange}/>
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>주소</div>
          <input id="address-input" style={{width: '40%', marginLeft: '15%', border: '1px solid #6a6a6a', borderRadius: '10px'}} placeholder='상세주소' value={address} onClick={onAddressOpen} readOnly />
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>해시태그</div>
          <div style={{width: '55%'}} >
          <Hashtag  selectedHashtagsId={selectedHashtagsId} selectedHashtagsName={selectedHashtagsName}></Hashtag>
          </div>
        </div>
      <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
      </div>
      <div style={{marginTop: "3%"}}>
        <div className="del-btn" style={{marginRight: '5%'}} onClick={delAccount}>회원 탈퇴</div>
        <div className="save-btn" type='button' onClick={modeChange}>저장</div>
      </div>
    </div>
    </form>
      :
    <div>
      <div style={{display: 'flex', margin: '0 auto', height: '15vh'}}>
        <div style={{textAlign: 'left', width: "30%", marginLeft: "5%", lineHeight: '15vh'}}>
          <Avatar 
              src={profileImg}
              isCentered
              size={'xl'} />
        </div>
        <div style={{display: 'block', width: "60%"}}>
          <div style={{display: "flex", justifyContent: "start", width: "100%", marginLeft: "5%", height: '40%', marginTop: '5%'}}>
            <div style={{fontSize: "19px", marginTop: '5%'}}>
              {userId}
            </div>
          </div>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <div>Exp. </div>
            <Progress hasStripe size='lg' value={experience/1000} colorScheme={'pink'} style={{width: '70%', borderRadius: '10px', marginTop: '2.5%', marginLeft: '3%'}}/>
          </div>
          <div style={{textAlign: 'right', marginRight: '10%', fontSize: '12px'}}>Lv.{level}&nbsp;&nbsp;&nbsp;{experience}/100000</div>
        </div>
      </div>
      <Divider style={{marginTop: '3%', marginBottom: '7%', width: '90%', marginLeft: '5%'}}></Divider>
      <div style={{marginLeft: '5%', marginRight: '5%'}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>아이디</div>
          <div style={{width: '40%', marginLeft: '15%'}}>{userId}</div>
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>닉네임</div>
          <div style={{width: '40%', marginLeft: '15%'}}>{nickname}</div>
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>이름</div>
          <div style={{width: '40%', marginLeft: '15%'}}>{name}</div>
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '22%', textAlign: 'left'}}>성별</div>
          <div style={{width: '40%', marginLeft: '15%'}}>{gender===1?"남자":"여자"}</div>
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>나이</div>
          <div style={{width: '40%', marginLeft: '15%'}}>{age} 세</div>
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>핸드폰 번호</div>
          <div style={{width: '40%', marginLeft: '15%'}}>{phoneNum}</div>
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>주소</div>
          <div style={{width: '40%', marginLeft: '15%'}}>{address}</div>
        </div>
        <Divider style={{marginTop: '3%', marginBottom: '3%', width: '100%'}}></Divider>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '20%', textAlign: 'left'}}>해시태그</div>
          <div style={{width: '40%', marginLeft: '15%'}}>{selectedHashtagsName}</div>
        </div>
      </div>
      <div style={{marginTop: "3%"}}>
        <div className="del-btn" style={{marginRight: '5%'}} onClick={delAccount}>회원 탈퇴</div>
        <div className="save-btn" type='button' onClick={modeChange}>수정</div>
      </div>
    </div>
  }
  </>
  );
}

export default UpsideProfile;
