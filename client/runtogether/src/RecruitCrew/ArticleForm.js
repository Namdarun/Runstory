import React, { useEffect, useState } from 'react';
import './ArticleForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faPersonDress, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    HStack,
    useNumberInput,
    Input,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
  } from '@chakra-ui/react';
import HashTag from '../CreateFeed/HashTag';
import ImgUpload from './ImgUpload';
import axios from 'axios';

const ArticleForm = () => {
    const accessToken = localStorage.getItem("access-token");
    const Tmapv2 = window.Tmapv2;

    const { isOpen: isCancelOpen, onOpen: onCancelOpen, onClose: onCancelClose } = useDisclosure(); // 작성 취소 확인 모달을 위한 변수
    
    const { isOpen: isStartOpen, onOpen: onStartOpen, onClose: onStartClose } = useDisclosure(); // 출발지 지정 모달을 위한 변수
    const { isOpen: isEndOpen, onOpen: onEndOpen, onClose: onEndClose } = useDisclosure(); // 출발지 지정 모달을 위한 변수
    
    const [startKeyword, setStartKeyword] = useState(""); // 출발지 장소 검색어
    const [endKeyword, setEndKeyword] = useState(""); // 도착지 장소 검색어

    const handleStartKeywordChange = ({ target: { value } }) => setStartKeyword(value);
    const handleEndKeywordChange = ({ target: { value } }) => setEndKeyword(value);
    const [startResult, setStartResult] = useState([]);
    const [endResult, setEndResult] = useState([]);

    const [startLat, setStartLat] = useState();
    const [startLng, setStartLng] = useState();
    const [endLat, setEndLat] = useState();
    const [endLng, setEndLng] = useState();

    const [selectedHashtagsId, setSelectedHashtagsId] = useState(new Set()); // 해시태그
    const [selectedHashtagsName, setSelectedHashtagsName] = useState(new Set()); // 해시태그
    const [crewName, setCrewName] = useState(""); // 런닝 제목
    const [content, setContent] = useState(""); // 런닝 내용
    const [distance, setDistance] = useState(""); 
    const [date, setDate] = useState(""); // 날짜
    const [startTime, setStartTime] = useState(""); // 시작 시간
    const [endTime, setEndTime] = useState(""); // 종료 시간
    const [startPlace, setStartPlace] = useState(""); // 시작 위치
    const [endPlace, setEndPlace] = useState(""); // 종료 위치
    const [image, setImage] = useState([]);
    const [preview, setPreview] = useState([]);
    const [manCount, setManCount] = useState(0);
    const [womenCount, setWomenCount] = useState(0);
    const [count, setCount] = useState(0); //성별 무관
    const [minAge, setMinAge] = useState(10);
    const [maxAge, setMaxAge] = useState(20);

    const navigate = useNavigate(); // navigate 변수 생성

    const handleCrewNameChange = ({ target: { value } }) => setCrewName(value);
    const handleContentChange = ({ target: { value } }) => setContent(value); 
    const handleDistanceChange = ({ target: { value } }) => setDistance(value); 
    const handleManCountChange = ({ target: { value } }) => setManCount(value); 
    const handleWomenCountChange = ({ target: { value } }) => setWomenCount(value); 
    const handleCountChange = ({ target: { value } }) => setCount(value); 
    const handleMinAgeChange = ({ target: { value } }) => setMinAge(value); 
    const handleMaxAgeChange = ({ target: { value } }) => setMaxAge(value); 
    const handleDateChange = ({ target: { value } }) => setDate(value); 
    
    const navigateHome = () => { // 취소 클릭 시 홈으로 가기 위함
      navigate("/main");
    };

    // 남자 수 입력을 위한 부분
    const { getInputProps: manInput, getIncrementButtonProps: manInc, getDecrementButtonProps: manDec } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 50,
    });

    // 여자 수 입력을 위한 부분
    const { getInputProps: womanInput, getIncrementButtonProps: womanInc, getDecrementButtonProps: womanDec } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 50,
    });

    // 성별 무관 수 입력을 위한 부분
    const { getInputProps: whoeverInput, getIncrementButtonProps: whoeverInc, getDecrementButtonProps: whoeverDec } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 50,
    });

    // +클릭 시 1명 증가, -클릭 시 1명 감소, 그에 따른 input의 value 반영을 위한 부분
    const incMan = manInc();
    const decMan = manDec();
    const inputMan = manInput();
    const incWoman = womanInc();
    const decWoman = womanDec();
    const inputWoman = womanInput();
    const incWhoever = whoeverInc();
    const decWhoever = whoeverDec();
    const inputWhoever = whoeverInput();

    // TIME 입력 부분의 default 값 (placeholder)을 설정하기 위한 부분
    useEffect(() => { 
      var today = new Date(); 
      var year = today.getFullYear(); // 년도
      var month = today.getMonth() + 1;  // 월
      if(month < 10) { // 자릿수 조정
        month = '0' + month;
      }
      var date = today.getDate();  // 날짜
      if(date < 10) { // 자릿수 조정
        date = '0' + date;
      }

      var hour = today.getHours(); // 시
      var hour2 = today.getHours() + 1;
      if(hour < 10) { // 자릿수 조정
        hour = '0' + hour;
      }
      if(hour2 < 10) { // 자릿수 조정
        hour2 = '0' + hour2;
      }

      var minute = today.getMinutes();  // 분
      var minute2 = today.getMinutes() + 1;
      if(minute < 10) { // 자릿수 조정
        minute = '0' + minute;
      }
      if(minute2 < 10) {
        minute2 = '0' + minute;
      }

      var finalDate = year+"-"+month+"-"+date;
      var finalTime = hour+":"+minute;
      var finalTime2 = hour2+":"+minute2;

      document.getElementById('start-date-input').value = finalDate;
      document.getElementById('start-time-input').value = finalTime;
      document.getElementById('end-time-input').value = finalTime2;
      // console.log(finalDate)
      // console.log(finalTime)
      // console.log(finalTime2)
      
    })

    const handleSubmit = (event) => { // 작성 버튼 클릭 시 이벤트 함수
      event.preventDefault();
      var selectedHashTags = Array.from(selectedHashtagsId)
      // console.log(selectedHashTags)
      // alert(`작성된 내용: ${content}, 공개범위: ${value}, 해시태그: ${selectedHashTags}`); // 데이터 잘 들어왔는지 확인용!!!
      registerRunning(selectedHashTags);
    };

    async function registerRunning(selectedHashTags) {
      const formData = new FormData();
      setManCount()
      setWomenCount(document.getElementById('woman-input').value)
      setCount(document.getElementById('whoever-input').value)

      // console.log(crewName) // 크루명
      // console.log(content) // 내용
      // console.log(document.getElementById('man-input').value) // 남자
      // console.log(document.getElementById('woman-input').value) // 여자
      // console.log(document.getElementById('whoever-input').value) // 성별 무관
      // console.log(startLat, startLng) // 시작 위도 경도
      // console.log(endLat, endLng) // 도착 위도 경도
      // console.log(distance) // 계산된 거리
      // console.log(minAge) // 최소 나이
      // console.log(maxAge) // 최대 나이
      // console.log(date) // 날짜 및 시간

      image.forEach((file)=>{
        formData.append('runningImg', file)
      })

      formData.append('crewName', crewName);
      formData.append('runningContent', content);
      formData.append('distance', distance);

      formData.append('man', document.getElementById('man-input').value);
      formData.append('women', document.getElementById('woman-input').value);
      formData.append('total', document.getElementById('whoever-input').value);
      
      formData.append('genderType', "All");
      // formData.append('hasDog', true);

      formData.append('minAge', minAge);
      formData.append('maxAge', maxAge);

      formData.append('startTime', document.getElementById('start-date-input').value+" "+document.getElementById('start-time-input').value);
      formData.append('startLatitude', startLat);
      formData.append('startLongitude', startLng);
      formData.append('startLocation', startPlace);
      
      formData.append('endTime', document.getElementById('start-date-input').value+" "+document.getElementById('end-time-input').value);
      formData.append('endLatitude', endLat);
      formData.append('endLongitude', endLng);
      formData.append('endLocation', endPlace);
      
      formData.append('hastag', selectedHashTags);

      const data = await axios({
        url: 'https://i8a806.p.ssafy.io/api/running',       
        method: "post", data: formData,
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` } });

        window.location.replace("/running-crew-list");
    }

    // 출발지 장소 검색 API
    async function searchStartLoc(e) {
      e.preventDefault();
      var result = await axios.get("https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result", {
        headers: {
          appkey: "l7xxe210feb29ba24deda6a06b0d0e88366a"
        },
        params: {
          "searchKeyword" : startKeyword, // 검색 키워드
          "resCoordType" : "WGS84GEO", // 요청 좌표계
          "reqCoordType" : "WGS84GEO", // 응답 좌표계
          "count" : 100 // 가져올 갯수
        }
    })
    setStartResult(result.data.searchPoiInfo.pois.poi)
  }

    // 도착지 장소 검색 API
    async function searchEndLoc(e) {
      e.preventDefault();
      var result = await axios.get("https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result", {
        headers: {
          appkey: "l7xxe210feb29ba24deda6a06b0d0e88366a"
        },
        params: {
          "searchKeyword" : endKeyword, // 검색 키워드
          "resCoordType" : "WGS84GEO", // 요청 좌표계
          "reqCoordType" : "WGS84GEO", // 응답 좌표계
          "count" : 100 // 가져올 갯수
        }
    })
    setEndResult(result.data.searchPoiInfo.pois.poi)
  }

  // 출발지
  function selectStartLoc(place, e) {
    e.preventDefault();
    var latLng = e.target.id.split(" ");
    setStartLat(latLng[0]);
    setStartLng(latLng[1]);
    document.getElementById('start-input').placeholder = place;
    setStartPlace(place);
    onStartClose();
  }

  // 도착지
  function selectEndLoc(place, e) {
    e.preventDefault();
    var latLng = e.target.id.split(" ");
    setEndLat(latLng[0]);
    setEndLng(latLng[1]);
    document.getElementById('end-input').placeholder = place;
    setEndPlace(place);
    onEndClose();
  }

  // 거리 계산
  function calcDistance() {
    var startPos = new Tmapv2.LatLng(startLat, startLng);
    var endPos = new Tmapv2.LatLng(endLat, endLng);
    var dist = startPos.distanceTo(endPos).toString();
    var temp = dist.split(".");
    dist = temp[0];
    setDistance(dist);
    document.getElementById('distance').style.display = 'block'
    document.getElementById('distance').style.textAlign = 'right'
    document.getElementById('distance').innerText = "거리 " + dist + " m";
  }

  // 나이 설정
  function getAge(range) {
    setMinAge(range[0])
    setMaxAge(range[1])
  }
    return (
    <>
      <Modal isCentered isOpen={isStartOpen} onClose={onStartClose} size='xs' scrollBehavior='inside' height={'10vh'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>출발지</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <form onSubmit={searchStartLoc}>
        <div width="100%" style={{margin: '0 auto', textAlign: 'center', marginBottom: '10px'}}>
              <Input width='80%' marginLeft='3%' marginRight='3%' size='xs' marginTop='30px' value={startKeyword} name='keyword' onChange={handleStartKeywordChange} placeholder="검색어를 입력해주세요"/>
              <button type='submit' className="search-btn">🔍</button>
            </div>
          </form>
            <Table size='sm' textAlign={'center'} variant={'striped'} isCentered>
                <Thead>
                  <Tr>
                    {/* <Th textAlign={'center'}>No.</Th> */}
                    <Th textAlign={'center'}>장소명</Th>
                    <Th textAlign={'center'}>주소</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {startResult.map((item, idx) => {
                    var id = item.frontLat + " " + item.frontLon
                    return(
                          <Tr id={id} onClick={(e) => selectStartLoc(item.name, e)}>
                              <Td id={id} textAlign={'center'}>{item.name}</Td>
                              <Td id={id} textAlign={'center'}>{item.upperAddrName} {item.middleAddrName} {item.lowerAddrName} {item.roadName}</Td>
                          </Tr>
                      )
                    })}
                </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <Modal isCentered isOpen={isEndOpen} onClose={onEndClose} size='xs' scrollBehavior='inside' height={'10vh'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>도착지</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <form onSubmit={searchEndLoc}>
        <div width="100%" style={{margin: '0 auto', textAlign: 'center', marginBottom: '10px'}}>
              <Input width='80%' marginLeft='3%' marginRight='3%' size='xs' marginTop='30px' value={endKeyword} name='keyword' onChange={handleEndKeywordChange} placeholder="검색어를 입력해주세요"/>
              <button type='submit' className="search-btn">🔍</button>
            </div>
          </form>
            <Table size='sm' textAlign={'center'} variant={'striped'} isCentered>
                <Thead>
                  <Tr>
                    {/* <Th textAlign={'center'}>No.</Th> */}
                    <Th textAlign={'center'}>장소명</Th>
                    <Th textAlign={'center'}>주소</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {endResult.map((item, idx) => {
                    var id = item.frontLat + " " + item.frontLon
                    return(
                          <Tr id={id} onClick={(e) => selectEndLoc(item.name, e)}>
                              <Td id={id} textAlign={'center'}>{item.name}</Td>
                              <Td id={id} textAlign={'center'}>{item.upperAddrName} {item.middleAddrName} {item.lowerAddrName} {item.roadName}</Td>
                          </Tr>
                      )
                    })}
                </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
        <form className='article-form' onSubmit={handleSubmit}>
            <ImgUpload image={image} setImage={setImage} preview={preview} setPreview={setPreview}></ImgUpload>
            <HashTag selectedHashtagsId={selectedHashtagsId} selectedHashtagsName={selectedHashtagsName}></HashTag>
            <div className='title'>크루명</div>
            <input className='title-input' placeholder='제목을 입력해주세요' onChange={handleCrewNameChange} type='text'></input>
            <div className='content' type='text'>내용</div>
            <textarea className='content-input' placeholder='내용을 입력해주세요' rows="5" onChange={handleContentChange}>{content}</textarea>
            
            <div style={{display: 'flex', width: '100%'}}>
              <div style={{display: 'block', width: '40%', marginLeft: '5%'}}>
                <div className='start location'>출발지</div>
                <input style={{width: '100%', borderRadius: '5px', border: '1px solid #616161', fontSize: '12px'}} className='location-input' id='start-input' placeholder='위치 검색' type='text' readOnly onClick={onStartOpen}></input>
              </div>
              <div style={{display: 'block', width: '10%'}}></div>
              <div style={{display: 'block', width: '40%', marginRight: '5%'}}>
                <div className='end location'>도착지</div>
                <input style={{width: '100%', borderRadius: '5px', border: '1px solid #616161', fontSize: '12px'}} className='location-input' id='end-input' placeholder='위치 검색' type='text' readOnly onClick={onEndOpen}></input>
              </div>
            </div>
            <div style={{width: '100%', display: 'flex'}}>
              <div style={{width: '50%'}}>
                <button onClick={calcDistance} className="calc-dist" type='button'>출발/도착지 확정</button>
              </div>
              <div id='distance' style={{width: '50%', textAlign: 'right', marginRight: '5%', display: 'none', color: "#616161", fontSize: '15px'}}></div>
            </div>
            <div className='title'>연령대</div>
            <div className='title' style={{marginTop: '0px'}}>{minAge} ~ {maxAge} 세</div>
            <RangeSlider
              w='90%'
              ms='5%'
              defaultValue={[10, 20]}
                min={0}
                max={100}
                onChange={(val) => getAge(val)}
              colorScheme='pink'
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} onChange={(v) => setMinAge(v)}/>
              <RangeSliderThumb index={1} onChange={(v) => setMaxAge(v)}/>
            </RangeSlider>

            <div className='people'>인원</div>
            <div className='people-input'>
                <div className='man-input'>
                    <FontAwesomeIcon icon={faPerson} className='man-icon' />
                    <HStack>
                      <div className='man-number' style={{width: '90px'}}>&nbsp;남자 수</div>
                      <Button {...decMan} size='xs' variant='link'>-</Button>
                      <Input {...inputMan} size='xs' id="man-input" textAlign={'center'} width='30%' onChange={handleManCountChange}/>
                      <Button {...incMan} size='xs' variant='link'>+</Button>
                    </HStack>
                    {/* <input placeholder='남자 수' className='man-number' type="number"></input> */}
                </div>
                <div className='woman-input'>
                    <FontAwesomeIcon icon={faPersonDress} className='woman-icon' />
                    <HStack>
                      <div className='woman-number' style={{width: '90px'}}>&nbsp;여자 수</div>
                      <Button {...decWoman} size='xs' variant='link'>-</Button>
                      <Input {...inputWoman} size='xs' id="woman-input" textAlign={'center'} width='30%'onChange={handleWomenCountChange}/>
                      <Button {...incWoman} size='xs' variant='link'>+</Button>
                    </HStack>
                </div>
                <div className='whoever-input'>
                    <FontAwesomeIcon icon={faQuestion} className='whoever-icon' />
                    <HStack>
                      <div className='whoever-number' style={{width: '90px'}}>&nbsp;성별 무관 수</div>
                      <Button {...decWhoever} size='xs' variant='link'>-</Button>
                      <Input {...inputWhoever} size='xs' id="whoever-input" textAlign={'center'} width='30%'onChange={handleCountChange}/>
                      <Button {...incWhoever} size='xs' variant='link'>+</Button>
                    </HStack>
                </div>
            </div>
            <div className='time' style={{marginBottom: '5px'}}>날짜 및 시간</div>
            <div className='time-input'>
                <input className='start-date-input' type='date' id='start-date-input'></input>
                <input className='start-time-input' type='time' id='start-time-input'></input>
                <div className='between'>~</div>
                <input className='end-time-input' type='time' id='end-time-input'></input>
                </div>
            <div className='submit-and-cancel'>
                <button className='submit-btn' type='submit'><p>등록</p></button>
                <button className='cancel-btn' type='button' onClick={onCancelOpen}><p>취소</p></button>
            </div>
            <Modal isCentered isOpen={isCancelOpen} onClose={onCancelClose} size='xs' className='modal'>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>경고</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                작성중인 글이 모두 지워집니다. 그래도 나가시겠습니까?
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='red' mr={3} onClick={onCancelClose}>
                    취소
                  </Button>
                  <Button variant='ghost' onClick={navigateHome}>확인</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
        </form>
      </>
    );
}

export default ArticleForm;