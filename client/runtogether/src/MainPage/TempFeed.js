import React, { useEffect, useState } from 'react';
import './Feed.css';
import axios from "axios";
import FeedCard from './FeedCard';
// import Recommend from './Recommend';
import './Recommend.css'
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // fontawesome 사용
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import {
  Spinner,
} from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderImg from "../RunningCrewList/SliderImg.js";
import SliderTitle from "./SliderTitle.js"

export default function TempFeed() {
  const [feeds, setFeeds] = useState([]);
  const [runningCrew, setrunningCrew] = useState([]);
  const [isMore, setIsMore] = useState(true);
  const [arr, setArr] = useState([]);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })

  var startIdx = 0;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }, [])

  useEffect(() => {
    const size = 1000;
    const lastfeedid = Number.MAX_SAFE_INTEGER + 1;
    (async () => {
      if (localStorage.getItem("access-token") === null) {  //비회원 조회 시
        const data = await axios.all(
          [axios.get(
            `https://i8a806.p.ssafy.io/api/main/feed?lastfeedid=${lastfeedid}&size=${size}`
          ),
          axios.get(
            `https://i8a806.p.ssafy.io/api/main/running?latitude=${state.center.lat}&longitude=${state.center.lng}`
          )
          ]);
          // console.log(state.center);
        setFeeds(data[0].data.data);
        setArr(Array.from(feeds.slice(startIdx, startIdx + 5)));
        setrunningCrew(data[1].data.data);
      }
      else { //회원 조회 시
        const data = await axios.all(
          [axios({
            url: `https://i8a806.p.ssafy.io/api/main/user-feed?lastfeedid=${lastfeedid}&size=${size}`,
            method: "GET",
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("access-token")}`
            }
          }
          ),
          axios.get(
            `https://i8a806.p.ssafy.io/api/main/running?latitude=${state.center.lat}&longitude=${state.center.lng}`
          )
          ]);
          // console.log(state.center);
        setFeeds(data[0].data.data);
        setArr(Array.from(feeds.slice(startIdx, startIdx + 5)));
        setrunningCrew(data[1].data.data);
      }
    })();
  }, [feeds.length]);

  // 무한 스크롤을 하기 위함
  function loadMore() {
    startIdx = arr.length;
    var endIdx = startIdx + 5;
    if (arr.length === feeds.length || feeds.length === 0) {
      setIsMore(false);
      return;
    }
    setTimeout(() => {
      setArr(arr.concat(Array.from(feeds.slice(startIdx, endIdx))));
    }, 1500);
  };

  // 피드 끝까지 내려갔을 때 새로고침 버튼을 만들어주기 위함
  function refreshToHome() {
    window.location.replace("/")
  }

  function sliceData(data) {
    const tempArr = [];
    for(let i = 0; i < data.length; i+=4) {
      tempArr.push(data.slice(i, i+4))
    }
    if(tempArr[tempArr.length - 1] != undefined){
      if(tempArr[tempArr.length - 1].length % 4 === 0) {
        return tempArr;
      }
      else if(tempArr[tempArr.length - 1].length % 4 ===1) {
        tempArr[tempArr.length - 1].push({runningId: -1})
        tempArr[tempArr.length - 1].push({runningId: -1})
        tempArr[tempArr.length - 1].push({runningId: -1})
      }
      else if(tempArr[tempArr.length - 1].length % 4===2) {
        tempArr[tempArr.length - 1].push({runningId: -1})
        tempArr[tempArr.length - 1].push({runningId: -1})  
      }
      else {
        tempArr[tempArr.length - 1].push({runningId: -1})  
      }
    }
    return tempArr;
  }

  // Slide Setting
  const settings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className='swiper-slide'>
        {runningCrew===null?null:<Slider {...settings}>
        {sliceData(runningCrew).map((s) => {
            return(
          <div className='slide'>
            <div className='imgs'>
              {
                <SliderImg runningCrew={s}></SliderImg>
              }
            </div>
            <div className='imgs'>
              {
                <SliderTitle runningCrew={s}></SliderTitle>
              }
            </div>
          </div>
          )})}
          {/* <div className='slide'>
            <div className='imgs'>

              {
                <SliderImg runningCrew={runningCrew.slice(0, 4)}>
                </SliderImg>
              }
            </div>
            <div className='imgs'>
              {
                <SliderTitle runningCrew={runningCrew.slice(0, 4)}></SliderTitle>
              }
            </div>
          </div>
          <div className='slide'>
            <div className='imgs'>
              {
                <SliderImg runningCrew={runningCrew.slice(4, 8)}></SliderImg>
              }
            </div>
            <div className='imgs'>
              {
                <SliderTitle runningCrew={runningCrew.slice(4, 8)}></SliderTitle>
              }
            </div>
          </div>
          <div className='slide'>
            <div className='imgs'>
              {
                <SliderImg runningCrew={runningCrew.slice(8, 12)}></SliderImg>
              }
            </div>
            <div className='imgs'>
              {
                <SliderTitle runningCrew={runningCrew.slice(8, 12)}></SliderTitle>
              }
            </div>
          </div> */}
        </Slider>}
      </div>
      
      <div className='entire-feed'>
        {feeds.length===0?<div style={{ textAlign: "center", fontWeight: "light" }}>
              <div>
                모든 피드를 확인했습니다
              </div>
              <FontAwesomeIcon className='refresh' icon={faArrowRotateRight} onClick={refreshToHome}></FontAwesomeIcon>
            </div>:
        <InfiniteScroll
          dataLength={arr.length}
          next={loadMore}
          hasMore={isMore}
          loader={<p style={{ textAlign: "center", marginTop: "10px" }}><Spinner textAlign={'center'} /></p>}
          endMessage={
            <div style={{ textAlign: "center", fontWeight: "light" }}>
              <div>
                모든 피드를 확인했습니다
              </div>
              <FontAwesomeIcon className='refresh' icon={faArrowRotateRight} onClick={refreshToHome}></FontAwesomeIcon>
            </div>
          }
        >
          {arr.map((feed, idx) => {
            return (
              <div height="50vh" margin='0 auto' marginTop='5%' key={idx}>
                <FeedCard feed={feed} key={idx}></FeedCard>
              </div>
            )
          })}
        </InfiniteScroll>
        }
      </div>
    </>
  );
}