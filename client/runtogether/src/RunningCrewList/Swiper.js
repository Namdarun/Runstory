import React, {useState, useEffect} from 'react';
import Slider from 'react-slick'
import "./Swiper.css";
import SliderTitle from "../MainPage/SliderTitle"
import SliderImg from "./SliderImg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import axiosH from "../api/axios"

const Swiper = () => { 
  const [info, setInfo] = useState([])
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

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
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
    if (localStorage.getItem("access-token") === null) {  // 비회원 조회 시
      return;
    }
    else { // 회원 조회 시
      (async () => {
        const data = await axiosH({
          url: `https://i8a806.p.ssafy.io/api/running?latitude=${state.center.lat}&longitude=${state.center.lng}`,
          method: "GET",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("access-token")}`
          }
        })
        setInfo(data.data.data)
        // setSlicedInfo(sliceData(Object.values(data.data.data[0])))
      })()
    }
  }, [state.isLoading]);

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
    vertical : false,
  };



  return (
    <>
    {
      info.map((item) => {
        return(
        <>
        {(Object.keys(item).map((k) => {
          return(
            <div className='filter-box'>
                  <div className='filter'># {k}</div>
              </div>
          )
          }))
        }
        
        <>
        {(Object.values(item)).map((runningCrew, idx) => {
          return(
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
        </Slider>}
      </div>
          )
  })}
  </>
        </>
        )
      })
    }  
    </>
  )
}

export default Swiper;