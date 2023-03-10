import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import './Signup.css'
import {
    Input,
    Radio, 
    RadioGroup,
    Stack,
    Slider,
    Tooltip,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    PinInput,
    PinInputField,
    Button,
    Avatar
  } from '@chakra-ui/react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import BetweenBodyFooter from '../common/BetweenBodyFooter'
import Address from './Address'
import { useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';
import DaumPostcode from 'react-daum-postcode';
import Hashtag from '../CreateFeed/HashTag'
const EMAIL_REGEX = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'https://i8a806.p.ssafy.io/api/user/signup';

// 아이디, 비밀번호, 비밀번호 확인, 이름, 성별, 나이, 닉네임, 주소, 전화 , 이미지 

const Signup = (props) => {
    const { isOpen: isEmailOpen, onOpen: onEmailOpen, onClose: onEmailClose } = useDisclosure()
    const { isOpen: isHashtagOpen, onOpen: onHashtagOpen, onClose: onHashtagClose } = useDisclosure()
    const { isOpen: isAddressOpen, onOpen: onAddressOpen, onClose: onAddressClose } = useDisclosure()

    const [email, setEmail] = useState();
    const [authcode, setAuthcode] = useState();
    const [authcodeInput1, setAuthcodeInput1] = useState();
    const [authcodeInput2, setAuthcodeInput2] = useState();
    const [authcodeInput3, setAuthcodeInput3] = useState();
    const [authcodeInput4, setAuthcodeInput4] = useState();
    const [authcodeInput5, setAuthcodeInput5] = useState();
    const [authcodeInput6, setAuthcodeInput6] = useState();
    const [authcodeInput7, setAuthcodeInput7] = useState();
    const [authcodeInput8, setAuthcodeInput8] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [name, setName] = useState();
    const [nickname, setNickname] = useState();
    const [phoneNum, setPhoneNum] = useState();
    const [gender, setGender] = useState('1');
    const [address, setAddress] = useState();
    const [age, setAge] = useState();
    const [showTooltip, setShowTooltip] = useState(false)
    const [roleType, setRoleType] = useState();
    const [regType, setRegType] = useState();
    const [selectedHashtagsId, setSelectedHashtagsId] = useState(new Set());
    const [selectedHashtagsName, setSelectedHashtagsName] = useState(new Set());
    const [hashtags, setHashtags] = useState();
    const [profileImg, setProfileImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [file, setFile] = useState()
    const fileInput = useRef(null)

    const handleEmailChange = ({ target: { value } }) => setEmail(value);
    const handleAuthcodeInputChange1 = ({ target: { value } }) => setAuthcodeInput1(value);
    const handleAuthcodeInputChange2 = ({ target: { value } }) => setAuthcodeInput2(value);
    const handleAuthcodeInputChange3 = ({ target: { value } }) => setAuthcodeInput3(value);
    const handleAuthcodeInputChange4 = ({ target: { value } }) => setAuthcodeInput4(value);
    const handleAuthcodeInputChange5 = ({ target: { value } }) => setAuthcodeInput5(value);
    const handleAuthcodeInputChange6 = ({ target: { value } }) => setAuthcodeInput6(value);
    const handleAuthcodeInputChange7 = ({ target: { value } }) => setAuthcodeInput7(value);
    const handleAuthcodeInputChange8 = ({ target: { value } }) => setAuthcodeInput8(value);
    const handlePasswordChange = ({ target: { value } }) => setPassword(value);
    const handlePassword2Change = ({ target: { value } }) => setPassword2(value);
    const handleNameChange = ({ target: { value } }) => setName(value);
    const handleNicknameChange = ({ target: { value } }) => setNickname(value);
    const handlePhoneNumChange = ({ target: { value } }) => setPhoneNum(value);
    // const handleGenderChange = ({ target: { value } }) => setGender(value);
    const handleAddressChange = ({ target: { value } }) => setAddress(value);
    const handleAgeChange = ({ target: { value } }) => setAge(value);
    const handleHashtagsChange = ({ target: { value } }) => setHashtags(value);
    const handleProfileImgChange = ({ target: { value } }) => setProfileImg(value);

    // 양식을 모두 채웠는지 확인하는 메소드
    function checkNoBlank() {
        if(email===undefined || email==="") {
            return false;
        }
        if(password===undefined || password==="") {
            return false;
        }
        if(name===undefined || name==="") {
            return false;
        }
        if(phoneNum===undefined || phoneNum==="") {
            return false;
        }
        if(address===undefined || address==="") {
            return false;
        }
        if(age===undefined || age===0) {
            return false;
        }
        if(hashtags===undefined) {
            return false;
        }
        return true;
    }
    const join = (event) => { // 작성 버튼 클릭 시 이벤트 함수
        event.preventDefault();
        
        if(!checkNoBlank()) {
            alert("양식을 모두 기입해주세요.");
            return;
        }
        const formData = new FormData();
        formData.append('userId', email);
        formData.append('userPwd', password);
        formData.append('userName', name);
        formData.append('userNickname', nickname);
        formData.append('emailAuth', true);
        formData.append('phoneNum', phoneNum);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('age', age);
        formData.append('roleType', "USER");
        formData.append('regType', "LOCAL");
        formData.append('hashtags', Array.from(selectedHashtagsId));
        formData.append('profileImg', file);
        
        try {
            const data = axios({
                url: 'https://i8a806.p.ssafy.io/api/user/signup',
                method: "POST", data: formData,
                headers: { 'Content-Type': 'multipart/form-data'} });
            window.location.replace("/");
            
        } catch (error) {
            alert("회원가입 실패")
        }

        };

    // 인증 코드 이메일 전송
    async function emailAuthSend() {
        if(!EMAIL_REGEX.test(email)) {
            alert("❌이메일 형식이 맞지 않습니다.");
            return;
        }
        const data = await axios.get(`https://i8a806.p.ssafy.io/api/auth/email?userEmail=${email}`);
        setAuthcode(data.data.data.authenticationCode);
    }

    // 인증 번호 확인
    function checkCode() {
        var authcodeInput = authcodeInput1+""+authcodeInput2+""+authcodeInput3+""+authcodeInput4
        +""+authcodeInput5+""+authcodeInput6+""+authcodeInput7+""+authcodeInput8;
        if(authcode===authcodeInput) {
            var emailInput = document.getElementById('email-input');
            emailInput.placeholder = email;
            onEmailClose();
        }
        else {
            var emailAuthCheck = document.getElementById('email-auth-check');
            emailAuthCheck.innerText = "❌인증에 실패하였습니다.";
        }
    }

    // 이메일 유효성 검사
    useEffect(() => {
        if(isEmailOpen) {
            var emailcheck = document.getElementById('email-check')
            if(email === undefined) {
                emailcheck.innerText = "";
                return;
            }
            if(EMAIL_REGEX.test(email)) {
                emailcheck.innerText = "✅올바른 이메일 형식입니다.";
                return;
            }
            emailcheck.innerText = "❌이메일 형식이 맞지 않습니다."
        }
    }, [email])

    // 비밀번호 유효성 검사
    useEffect(() => {
        var pwValidCheck = document.getElementById('pw-valid-check');
        if(password===undefined) {
            pwValidCheck.innerText = "";
            return;
        }
        if(PWD_REGEX.test(password)) {
            pwValidCheck.innerText = "✅사용가능한 비밀번호입니다.";
            return;
        }
        pwValidCheck.innerText = "❌영어, 숫자, 특수문자를 포함한 8~24자"
    }, [password])

    // 비밀번호랑 비밀번호 확인란 확인하기
    useEffect(() => {
        var pwcheck = document.getElementById('pwcheck');
        if(password === undefined && password2 === undefined) {
            pwcheck.innerText = ""
            return;
        }
        if(password2 === undefined) {
            pwcheck.innerText = ""
            return;
        }
        if(password === password2) {
            pwcheck.innerText = "✅비밀번호가 일치합니다."
            return;
        }
        pwcheck.innerText = "❌비밀번호 확인란을 다시 확인해주세요."
    }, [password, password2])

    // 나이 표시해주기
    useEffect(() => {
        var currentAge = document.getElementById("current-age");
        if(age === undefined) {
            currentAge.innerText = "0 세";
            return
        }
        currentAge.innerText = age + " 세";
    }, [age])

    // 해시태그 선택 모달을 열면 변수들 초기화부터
    function openHashtagSelect() {
        setSelectedHashtagsId(new Set())
        setSelectedHashtagsName(new Set())
        onHashtagOpen();
    }

    // 선택한 해시태그 placeholder에 표시해주기
    function saveHashtag() {
        var temp = "";
        selectedHashtagsName.forEach((v) => temp += v + " / ");
        temp = temp.slice(0, -3);
        setHashtags(temp);
        var hashtagInput = document.getElementById('hashtag-input');
        hashtagInput.placeholder = temp;
        onHashtagClose();
    }

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
    }
    
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

    return (
        <>
        <Header></Header>
        <Modal isOpen={isEmailOpen} onClose={onEmailClose} size='xs' isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Email 인증</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody style={{margin: '0 auto', width: '100%'}}>
                        <div style={{display: 'flex'}}>
                            <Input width="70%" size='m' variant='outline' placeholder='email' value={email} ps={2} onChange={handleEmailChange} />
                            <button onClick={emailAuthSend} style={{width: '25%', marginLeft: '5%', fontSize: '11px', color: '#6A6A6A', backgroundColor: '#EEB6B6', padding: '0 10px', fontWeight: 'bold', textAlign: 'center', borderRadius: '20px', height: '23px', lineHeight: '23px'}}>인증 코드 전송</button>
                        </div>
                        <p style={{textAlign: 'left'}} id='email-check'></p>
                        
                        {/* <Input width="70%" size='m' variant='outline' placeholder='인증코드' ps={2} mt={5} onChange={handleAuthcodeChange} /> */}
                    </ModalBody>
                    <ModalFooter style={{margin: '0 auto', display: 'block', textAlign: 'center'}}>
                        <PinInput type='alphanumeric' size='xs'>
                            <PinInputField value={authcodeInput1} onChange={handleAuthcodeInputChange1} m={0.5}/>
                            <PinInputField value={authcodeInput2} onChange={handleAuthcodeInputChange2} m={0.5}/>
                            <PinInputField value={authcodeInput3} onChange={handleAuthcodeInputChange3} m={0.5}/>
                            <PinInputField value={authcodeInput4} onChange={handleAuthcodeInputChange4} m={0.5}/>
                            <PinInputField value={authcodeInput5} onChange={handleAuthcodeInputChange5} m={0.5}/>
                            <PinInputField value={authcodeInput6} onChange={handleAuthcodeInputChange6} m={0.5}/>
                            <PinInputField value={authcodeInput7} onChange={handleAuthcodeInputChange7} m={0.5}/>
                            <PinInputField value={authcodeInput8} onChange={handleAuthcodeInputChange8} m={0.5}/>
                        </PinInput>
                        <br></br>
                        <p id='email-auth-check'></p>
                        <div onClick={checkCode} style={{width: '25%', margin: '10px auto', fontSize: '11px', color: '#6A6A6A', backgroundColor: '#EEB6B6', padding: '0 10px', fontWeight: 'bold', textAlign: 'center', borderRadius: '20px', height: '23px', lineHeight: '23px'}}>인증하기</div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isHashtagOpen} onClose={onHashtagClose} size='xs' isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Hashtag 선택</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody style={{margin: '0 auto', width: '100%'}}>
                        <Hashtag style={{width: '120%'}} selectedHashtagsId={selectedHashtagsId} selectedHashtagsName={selectedHashtagsName}></Hashtag>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' size='sm' mr={3} onClick={onHashtagClose}>
                            취소
                        </Button>
                        <Button variant='ghost' size='sm' mr={3} onClick={saveHashtag}>완료</Button>
                    </ModalFooter>
                    </ModalContent>
            </Modal>
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
            <div style={{width: '80%', margin: '0 auto', marginTop: '80px', marginBottom: '5px', fontSize: '30px', textAlign: 'center'}}>RUNSTORY</div>
        <form style={{width: '80%', margin: '0 auto', textAlign: 'center', border: '1px solid #cccccc', borderRadius: '20px',paddingTop: '10px', paddingBottom: '10px', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}} onSubmit={join}>
            <div style={{textAlign: 'center'}}>
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
            <div style={{textAlign: 'center', marginBottom: '10px'}}>프로필 사진을 설정해보세요!</div>
            <div style={{marginLeft: '10%', textAlign: 'left'}}>이메일</div>
            {/* <div style={{marginLeft: '10%', textAlign: 'center', border: '1px solid #6A6A6A', width: '35%', color: '#6A6A6A', display: 'none'}} id='auth-email'></div> */}
            <Input required id='email-input' border='1px solid #6A6A6A' width="80%" size='xs' variant='outline' onClick={onEmailOpen} readOnly ps={2} mb={3} placeholder='이메일'/>
            <div style={{marginLeft: '10%', textAlign: 'left'}}>비밀번호</div>
            <Input border='1px solid #6A6A6A'  width='80%' size='xs' variant='outline' placeholder='비밀번호' value={password} type='password' ps={2} mb={3} onChange={handlePasswordChange} />
            <p style={{marginLeft: '10%', textAlign: 'left'}} id='pw-valid-check'></p>
            <div style={{marginLeft: '10%', textAlign: 'left'}}>비밀번호 확인</div>
            <Input border='1px solid #6A6A6A' width='80%' size='xs' variant='outline' placeholder='비밀번호 재입력' value={password2} type='password' ps={2} mb={3} onChange={handlePassword2Change} />
            <p style={{marginLeft: '10%', textAlign: 'left'}} id='pwcheck'></p>
            <div style={{marginLeft: '10%', textAlign: 'left'}}>이름</div>
            <Input border='1px solid #6A6A6A' width='80%' size='xs' variant='outline' placeholder='이름' value={name} ps={2} mb={3} onChange={handleNameChange} />
            <div style={{marginLeft: '10%', textAlign: 'left'}}>닉네임</div>
            <Input border='1px solid #6A6A6A' width='80%' size='xs' variant='outline' placeholder='닉네임' value={nickname} ps={2} mb={3} onChange={handleNicknameChange} />
            <p style={{marginLeft: '10%', textAlign: 'left'}} id='nickname-check'></p>
            <div style={{marginLeft: '10%', textAlign: 'left'}}>전화번호</div>
            <Input border='1px solid #6A6A6A' type='number' width='80%' size='xs' variant='outline' placeholder='전화번호' value={phoneNum} ps={2} mb={3} onChange={handlePhoneNumChange} />
            <div style={{marginLeft: '10%', textAlign: 'left'}}>성별</div>
            <RadioGroup onChange={setGender} value={gender} mb={2}>
                <Stack direction='row' style={{marginTop: '5px', marginLeft: '10%'}}>
                    <Radio value='1' size='sm' colorScheme={"pink"}>남성</Radio>
                    <Radio style={{marginLeft: '10px'}} value='2' size='sm' colorScheme={"pink"}>여성</Radio>
                </Stack>
            </RadioGroup>
            <div style={{marginLeft: '10%', textAlign: 'left'}}>주소</div>
            <Input border='1px solid #6A6A6A' id="address-input" width='80%' size='xs' variant='outline' placeholder='상세주소' value={address} ps={2} mb={3} onClick={onAddressOpen} readOnly />
            <div style={{marginLeft: '10%', textAlign: 'left'}}>나이</div>
            <div style={{marginLeft: '10%', textAlign: 'left'}} id='current-age'></div>
            <Slider
                w='80%'
                textAlign={'left'}
                id='slider'
                defaultValue={0}
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
            {/* <div id='current-age'></div> */}
            <div style={{marginLeft: '10%', textAlign: 'left'}}>해시태그</div>
            <Input id='hashtag-input' border='1px solid #6A6A6A' width='80%' size='xs' variant='outline' placeholder='선택' textAlign='left' ps={2} mb={3} onClick={openHashtagSelect} readOnly/>
            <button type='submit' style={{borderRadius: '20px', color: '#6A6A6A', backgroundColor: '#EEB6B6', padding: '0 10px', margin: '5px', fontSize: '14px'}}>회원가입</button>
            <div style={{display:'flex', fontSize: '12px', justifyContent: 'center', marginTop: '3px'}}>
                <div>이미 RUNSTORY 회원이신가요?</div>&nbsp;<div style={{color: '#6A6A6A'}}><a href='https://i8a806.p.ssafy.io/user/login' style={{textDecoration: 'underline'}}>로그인하러가기</a></div>
            </div>
        </form>
        <BetweenBodyFooter></BetweenBodyFooter>
        <Footer></Footer>
        </>
    )
}

export default Signup;


// import { useRef, useState, useEffect } from "react";
// import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from './api/axios';
// // import axios from './axios';
// import './Signup.css'
// import {
//     ChakraProvider,
//     Button,
//   } from '@chakra-ui/react';
// import Header from '../common/Header';
// import Footer from '../common/Footer';
// import Address from './Address'
// import { useNavigate } from "react-router-dom";
// import imageCompression from 'browser-image-compression';

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = 'https://i8a806.p.ssafy.io/api/user/signup';

// // 아이디, 비밀번호, 비밀번호 확인, 이름, 성별, 나이, 닉네임, 주소, 전화 , 이미지 
// const Register = () => {
//     const userRef = useRef();
//     const errRef = useRef();
//     const imgRef = useRef();

//     const [id, setId] = useState('');
//     const [validName, setValidName] = useState(false);
//     const [userFocus, setUserFocus] = useState(false);

//     const [password, setPassword] = useState('');
//     const [validPwd, setValidPwd] = useState(false);
//     const [pwdFocus, setPwdFocus] = useState(false);

//     const [matchPwd, setMatchPwd] = useState('');
//     const [validMatch, setValidMatch] = useState(false);
//     const [matchFocus, setMatchFocus] = useState(false);

//     const [errMsg, setErrMsg] = useState('');
//     const [success, setSuccess] = useState(false);

//     const [userName, setUserName] = useState('');
//     const [userGender, setUserGender] = useState('');
//     const [userAge, setUserAge] = useState('');
//     const [userNickname, setUserNickname] = useState('');
//     // const [userAddress, setUserAddress] = useState('');
//     const [userPhonenum, setUserPhonenum] = useState('');
//     const [popup, setPopup] = useState(false);
//     const [userAddress, setUserAddress] = useState({
//         address:'',
//     });

//     const [userimgFile, setUserImgFile] = useState("");
//     const [previewImg, setPreviewImg] = useState();
    
//     const handleInput = (e) => {
//         setUserAddress({
//             ...userAddress,
//             [e.target.name]:e.target.value,
//         })
//     }
    
//     const handleComplete = () => {
//         setPopup(!popup);
//     }


//     const navigate = useNavigate(); // navigate 변수 생성
//     const navigateTag = () => { // 취소 클릭 시 홈으로 가기 위함
//         navigate("/user/signup/hashtag");
//       };

//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setValidName(USER_REGEX.test(id));
//     }, [id])

//     useEffect(() => {
//         setValidPwd(PWD_REGEX.test(password));
//         setValidMatch(password === matchPwd);
//     }, [password, matchPwd])

//     useEffect(() => {
//         setErrMsg('');
//     }, [id, password, matchPwd])
  
//     const encodeFile = (file) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         return new Promise((resolve) => {
//           reader.onload = () => {
//             setPreviewImg(reader.result);
//             resolve();
//           };
//         });
//       };

//   	const fileHandler = (event) => {
//     	const [file] = event.target.files;
        
      
//       	imageCompression(file, {
//         	maxSizeMB: 1,
//           	maxWidthOrHeight: 100,
//         }).then((compressedFile) => {
//         	const newFile = new File([compressedFile], file.name, {type: file.type});
          
//           	//미리보기 관련 함수 추가
//           	encodeFile(newFile);
//           	setUserImgFile(newFile);
//         });
//     };
//     // var file = {
//     //     img = 'userimgFile',
//     // }


    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("key", JSON.stringify({ id, password, userName, userGender, userAge, userNickname, userAddress, userPhonenum, userimgFile }));
//         formData.append("value", JSON.stringify({ id, password, userName, userGender, userAge, userNickname, userAddress, userPhonenum, userimgFile }));

//         // if button enabled with JS hack
//         const v1 = USER_REGEX.test(id);
//         const v2 = PWD_REGEX.test(password);  
//         if (!v1 || !v2) {
//             setErrMsg("일치하지 않음");
//             return;
//         }
//         try {
//             console.log(
//                 "콘솔 찍어보기"+
//                 " id :"+id+
//                 " password : "+password+
//                 " 이름 :" +userName+
//                 " 성별 :" +userGender+
//                 " 나이 :" +userAge+
//                 " 닉네임 :" +userNickname+
//                 " 주소 :" +userAddress.address+
//                 " 폰번호 :"+userPhonenum+
//                 " 이미지 : "+userimgFile.name)
//                 await axios.post(REGISTER_URL,
//                     {
//                         data: formData,
//                         headers: { 'Content-Type': 'multipart/form-data' },
//                         // withCredentials: true
//                     }
//                     );
//                     // TODO: remove console.logs before deployment
//                     // console.log(response)
//                 // console.log(JSON.stringify(response?.data));
//                 //console.log(JSON.stringify(response))
//             setSuccess(true);
//             //clear state and controlled inputs
//             setId('');
//             setPassword('');
//             setMatchPwd('');
//             setUserName('');
//             setUserAge('');
//             setUserGender('');
//             setUserNickname('');
//             setUserAddress('');
//             setUserPhonenum('');
//             setUserImgFile('');

//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('서버에 반응이 없습니다.');
//             } else if (err.response?.status === 409) {
//                 setErrMsg('사용된 사용자이름');
//             } else {
//                 setErrMsg('등록 실패')
//             }
//             errRef.current.focus();
//         }
//     }

//     return (
//         <ChakraProvider>    
//         <Header></Header>
//             {success ? (
//                 <section className="SignupSection" style={{width : '90%'}}>
//                     <h1>해시태그 선택창으로 이동합니다</h1>
//                     <p>
//                         <a href="/user/login">로그인</a>
//                     </p>
//                 </section>
//             ) : (
//                 <section className="SignupSection" style={{width : '90%'}}>
//                     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//                     <h1 style={{textAlign:'center' ,fontSize:'30px'}}>회원가입</h1>
//                     <form className="SignupForm" onSubmit={handleSubmit}>

//                         <label className='SignLabel' htmlFor="username">
//                             아이디
//                             <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
//                             <FontAwesomeIcon icon={faTimes} className={validName || !id ? "hide" : "invalid"} />
//                         </label>
//                         <input
//                             className="SignupInput"
//                             type="text"
//                             id="username"
//                             ref={userRef}
//                             autoComplete="off"
//                             onChange={(e) => setId(e.target.value)}
//                             value={id}
//                             required
//                             aria-invalid={validName ? "false" : "true"}
//                             aria-describedby="uidnote"
//                             onFocus={() => setUserFocus(true)}
//                             onBlur={() => setUserFocus(false)}
//                             placeholder='아이디를 입력하세요'
//                         />
//                         <p id="usernote" className={userFocus && id && !validName ? "instructions" : "offscreen"}>
//                             <FontAwesomeIcon icon={faInfoCircle} />
//                             4~24자까지<br />
//                             문자로 시작해야 합니다.<br />
//                             문자, 숫자, 밑줄, '-'만 가능합니다.
//                         </p>

//                         <label className='SignLabel' htmlFor="password">
//                             비밀번호
//                             <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
//                             <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
//                         </label>
//                         <input
//                             className="SignupInput"
//                             type="password"
//                             id="password"
//                             onChange={(e) => setPassword(e.target.value)}
//                             value={password}
//                             required
//                             aria-invalid={validPwd ? "false" : "true"}
//                             aria-describedby="pwdnote"
//                             onFocus={() => setPwdFocus(true)}
//                             onBlur={() => setPwdFocus(false)}
//                             placeholder='비밀번호를 입력하세요'
//                             />
//                         <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
//                             <FontAwesomeIcon icon={faInfoCircle} />
//                             8~24자까지<br />
//                             소문자, 숫자, 특수문자를 포함해야 합니다.<br />
//                             허용 특수문자: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
//                         </p>
//                         <br/>
//                         <label htmlFor="confirm_pwd">
//                             비밀번호 확인
//                             <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
//                             <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
//                         </label>
//                         <input
//                             className="SignupInput"
//                             type="password"
//                             id="confirm_pwd"
//                             onChange={(e) => setMatchPwd(e.target.value)}
//                             value={matchPwd}
//                             required
//                             aria-invalid={validMatch ? "false" : "true"}
//                             aria-describedby="confirmnote"
//                             onFocus={() => setMatchFocus(true)}
//                             onBlur={() => setMatchFocus(false)}
//                             placeholder='비밀번호를 다시 입력하세요'
//                             />
//                         <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
//                             <FontAwesomeIcon icon={faInfoCircle} />
//                             입력했던 비밀번호와 정확히 일치해야 합니다.
//                         </p>


//                         {/* 이하 상세정보 - 이름, 나이, 성별, 닉네임, 주소, 핸드폰번호*/}
//                         <label className='signup-detail-label' htmlFor="confirm_pwd">
//                             이름
//                         </label>

//                         <input
//                             className="SignupInput"
//                             type="userName"
//                             id="confirm_pwd"
//                             onChange={(e) => setUserName(e.target.value)}
//                             value={userName}
//                             placeholder='이름을 입력하세요'
//                             />

//                         <label className='signup-detail-label' htmlFor="confirm_pwd">
//                             나이
//                         </label>
//                         <input
//                             className="SignupInput"
//                             type="userAge"
//                             id="confirm_pwd"
//                             onChange={(e) => setUserAge(e.target.value)}
//                             value={userAge}
//                             placeholder='나이를 입력하세요'
//                             />

//                         <label className='signup-detail-label' htmlFor="confirm_pwd">
//                             성별
//                         </label>
//                         <div style={{display:'flex', justifyContent:'space-around'}} > 
//                             <p>
//                                 <label for="male">남성</label>
//                                 <input style={{marginLeft:'10px'}} id="male" type="radio" value="남성" name="ss"/>
//                             </p>
//                             <p>
//                                 <label for="female">여성</label>
//                                 <input style={{marginLeft:'10px'}} id="female" type="radio" value="여성" name="ss"/>
//                             </p>
//                         </div>

//                         {/* 중복여부 설정해야함 */}
//                         <label className='signup-detail-label' htmlFor="confirm_pwd">
//                             닉네임
//                         </label>

//                         <input
//                             className="SignupInput"
//                             type="userNickname"
//                             id="confirm_pwd"
//                             onChange={(e) => setUserNickname(e.target.value)}
//                             value={userNickname}
//                             placeholder='닉네임을 입력하세요'
//                             />
                        
//                         {/* 다음주소 라이브러리 끌어오기 */}
//                         <label className='signup-detail-label' htmlFor="confirm_pwd">
//                             주소
//                         </label>
//                         <input 
//                             className="SignupInput" 
//                             placeholder="주소를 입력하세요"  
//                             type="text" 
//                             required={true} 
//                             name="address" 
//                             onChange={handleInput} 
//                             value={userAddress.address}
//                             br/>

//                         <button style={{textAlign:'left'}} className="address-button" onClick={handleComplete}>주소 찾기</button>
//                         {popup && <Address company={userAddress} setcompany={setUserAddress}></Address>}

//                         <label className='signup-detail-label' htmlFor="confirm_pwd">
//                             핸드폰 번호
//                         </label>
//                         <input
//                             className="SignupInput"
//                             type="userPhonenum"
//                             id="confirm_pwd"
//                             onChange={(e) => setUserPhonenum(e.target.value)}
//                             value={userPhonenum}
//                             placeholder='핸드폰 번호를 입력하세요'
//                             />

//                         {/* <Button disabled={success} onClick={navigateTag} style={{margin:'0 auto' ,marginTop:'10px' }}> 
//                         완료
//                         </Button>  */}
//                         <button onClick={handleSubmit}>완료</button>
//                      </form>
//                     <p>
//                         이미 회원가입을 하셨다면?
//                      <a href="/user/login" style={{ marginLeft:'10px', textDecoration: 'underline'}}>로그인페이지로 이동</a>
//                     </p>
//                     <p>
//                         프로필 사진을 추가하고 싶으시다면? 
//                         <img src={previewImg}/>
//                         <input type="file" accept="image/*" onChange={(event) => fileHandler(event)}/>
//                     </p>

//                 </section>
//             )}
//     <Footer></Footer>
//     </ChakraProvider>
//     )
// }

// export default Register;