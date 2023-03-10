import React, { useEffect, useState, useRef } from 'react';
import './BasicMap.css';
import html2canvas from 'html2canvas';
// import {
//     Image, Card, CardBody, CardFooter, CardHeader
//   } from '@chakra-ui/react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import axios from 'axios';
import SearchLocation from './SearchLocation';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input
} from '@chakra-ui/react'


function BasicMap() {
  const Tmapv2 = window.Tmapv2;
  var [location, setLocation] = useState();
  var [error, setError] = useState();
  const [tmap, setTmap] = useState(new Tmapv2.LatLng(0, 0));
  var linePath = [];
  var container = useState();
  var options;
  var polyline = useState();

  var touchedX;
  var touchedY;

  useEffect(() => {
    var lat = 37.566535;
    var lng = 126.9779692;
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    });
    container = document.getElementById('map');
    options = {
      center: new Tmapv2.LatLng(lat, lng),
      zoom: 17
    };
    setTmap(new Tmapv2.Map(container, options))
    // new Tmapv2.extension.MeasureDistance({
		// 	map: tmap
    // });
  }, []);

  useEffect(() => {
    tmap.addListener("touchstart", onTouchstart); // 모바일에서 지도 터치 시작시, 이벤트 리스너 등록.
    tmap.addListener("touchend", onTouchend); // 모바일에서 지도 터치 터치가 끝났을때, 이벤트 리스너 등록.
  }, [tmap])
  
    function clearDrawing() {
      window.location.replace("/draw-map")
    }

    function addPolyline() {
      polyline = new Tmapv2.Polyline({
        path: linePath,
        strokeColor: "#EEB6B6",
        strokeWeight: 6,
        outlineColor: "#ee0000",
        direction: true,
        directionColor: "#ee0000",
        // map: tmap // 지도 객체
      });
      polyline.setMap(tmap);
    }

    function onTouchstart(e) {
      touchedX = tmap.realToScreen(new Tmapv2.LatLng(e.latLng['_lat'], e.latLng['_lng']))['x'];
      touchedY = tmap.realToScreen(new Tmapv2.LatLng(e.latLng['_lat'], e.latLng['_lng']))['y'];
    }

    function onTouchend(e) {
        var x = tmap.realToScreen(new Tmapv2.LatLng(e.latLng['_lat'], e.latLng['_lng']))['x'];
        var y = tmap.realToScreen(new Tmapv2.LatLng(e.latLng['_lat'], e.latLng['_lng']))['y'];
        // 드래그는 터치로 인식하지 않기 위한 if문
        if(Math.abs(touchedX - x) < 0.00000000005 && Math.abs(touchedY - y) < 0.00000000005) {
          linePath.push(new Tmapv2.LatLng(e.latLng['_lat'], e.latLng['_lng']))
          addPolyline();
        }
    }

    // 캡쳐 부분
    function onCapture() {
      html2canvas(document.getElementById("map"), 
        {allowTaint: true,
        useCORS: true,}
      ).then(canvas => {
      onSaveAs(canvas.toDataURL('image/png'), '경로 이미지.png')
      });
    }

    // 이미지 다운로드
    function onSaveAs(uri, fileName) {
      var link = document.createElement('a');
      document.body.appendChild(link);
      link.href = uri;
      link.download = fileName;
      link.click();
      document.body.removeChild(link);
    }

    // const handleSubmit = (event) => { // 작성 버튼 클릭 시 이벤트 함수
    //     event.preventDefault();
    //     searchLoc();
    //     console.log(tmap)
    // };
    
    return (
        <div id='canvas'>
          <div id="map" style={{width:"100%", height:"40vh", margin: "0 auto", marginTop: "-20px" }}></div> 
          <div display='inline-block'>
            <div className="del-btn" onClick={clearDrawing}>다시 그리기</div>
            <div className="save-btn" onClick={onCapture}>이미지로 저장하기</div>
          </div>
          <div style={{maxHeight: '40vh', overflow: 'scroll', width: '100%', margin: '0 auto'}}>
          <SearchLocation tmap={tmap}></SearchLocation>
          </div>
          {/* <MapSearchResult result={result}></MapSearchResult> */}
          {/* <button onClick={clearDrawing}>라인 삭제하기</button> */}
          {/* <button onClick={drawPolyline} onTouchStart={drawPolyline}>라인 그리기</button> */}
          {/* <button onClick={clearDrawing} onTouchStart={clearDrawing}>라인 삭제하기</button> */}
        </div>
    );
  }

export default BasicMap;
