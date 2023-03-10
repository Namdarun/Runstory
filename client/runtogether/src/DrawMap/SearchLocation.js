import React, { useEffect, useState, useRef } from 'react';
import './BasicMap.css';
import html2canvas from 'html2canvas';
// import {
//     Image, Card, CardBody, CardFooter, CardHeader
//   } from '@chakra-ui/react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react'

function SearchLocation({tmap, type}) {
  const Tmapv2 = window.Tmapv2;
  const [keyword, setKeyword] = useState("");

    const handleKeywordChange = ({ target: { value } }) => setKeyword(value);
    const [result, setResult] = useState([]);

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
    const [startPlace, setStartPlace] = useState(""); // 시작 위치
    const [endPlace, setEndPlace] = useState(""); // 종료 위치
    const [distance, setDistance] = useState(""); 

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
    var lat = latLng[0];
    var lng = latLng[1];
    var temp = new Tmapv2.LatLng(lat, lng);
    tmap.panTo(temp);
    var marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(lat, lng), //Marker의 중심좌표 설정.
      icon: "http://tmapapi.sktelecom.com/resources/images/common/pin_car.png",
      map: tmap //Marker가 표시될 Map 설정..
    });
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
      var lat = latLng[0];
      var lng = latLng[1];
      var temp = new Tmapv2.LatLng(lat, lng);
      tmap.panTo(temp);
      var marker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(lat, lng), //Marker의 중심좌표 설정.
        map: tmap //Marker가 표시될 Map 설정..
      });
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

    async function searchLoc(e) {
      e.preventDefault();
      var result = await axios.get("https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result", {
        headers: {
          appkey: "l7xxe210feb29ba24deda6a06b0d0e88366a"
        },
        params: {
          "searchKeyword" : keyword, // 검색 키워드
          "resCoordType" : "WGS84GEO", // 요청 좌표계
          "reqCoordType" : "WGS84GEO", // 응답 좌표계
          "count" : 100 // 가져올 갯수
        }
    })
    setResult(result.data.searchPoiInfo.pois.poi)
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

    <form onSubmit={searchLoc}>
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
      </form>
        </>
    );
  }

export default SearchLocation;
