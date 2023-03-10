import React, {useState, useEffect} from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import {HStack, Box, Button, Spacer, Heading, Stack, StackDivider, Text, Image, Divider, ButtonGroup} from '@chakra-ui/react';
import axios from '../api/axios'
import RunningCard from './RunningCard';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderTitle from "../MainPage/SliderTitle"
import SliderImg from "../RunningCrewList/SliderImg"
import RunningMyPageMsg from './RunningMyPageMsg'

function RunningDetail(){
    const [mycrews, setMycrews] = useState([]);
    const [joincrews, setJoincrews] = useState([]);
    const [dibscrews, setDibscrews] = useState([]);
    const [pastcrews, setPastcrews] = useState([]);
    useEffect(() => {
        (async () => {
            const url = "running/mycrew/reservation";
            const data = await axios.get(url)
                .then(function(response) {
                    setMycrews(response.data.data[0].mycrew)
                    setJoincrews(response.data.data[1].joincrew)
                    setDibscrews(response.data.data[2].dibscrew)
                    setPastcrews(response.data.data[3].pastcrew)
                })
                .catch(function(error) {
                    // console.log("실패")
                })
        })();
    }, []);

    function sliceData(data) {
        const tempArr = [];
        for(let i = 0; i < data.length; i+=4) {
          tempArr.push(data.slice(i, i+4))
        //   console.log(data.slice(i, i+4))
        }
        if(tempArr[tempArr.length - 1] != undefined){
            // console.log(tempArr)
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
    // var profileurl = "https://i8a806.p.ssafy.io/runstory/user/" + feeds.profileImgFileName;
    // var feedurl = "https://i8a806.p.ssafy.io/runstory/feeds/" + feedfiles.filePath;
    // var commenturl = "https://i8a806.p.ssafy.io/runstory/user/" + user.profileImgFileName;

    // function GotoComment() {
    //     const url = `running/${feedId}/comment`;
    //     axios.get(url)
    //         .then(function(response) {
    //             console.log("성공");
    //         })
    //         .catch(function(error) {
    //             console.log("실패");
    //         })
    // }
    
    return (
        <div>
        <Header></Header>
        <RunningMyPageMsg></RunningMyPageMsg>
        <div>
            <div style={{marginLeft: '3%'}} className='filter-box'><div className='filter'>내가 만든 크루</div></div>
            <div>
                {
                    mycrews===null?null:
                    <Slider {...settings}>
                        {sliceData(mycrews).map((s) => {
                            return(
                                <div className="slide">
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
                            )
                        })}
                    </Slider>
                }
            </div>
            <div>
            <div style={{marginLeft: '3%'}} className='filter-box'><div className='filter'>내가 가입한 크루</div></div>
            <div>
                {
                    joincrews===null?null:
                    <Slider {...settings}>
                        {sliceData(joincrews).map((s) => {
                            return(
                                <div className="slide">
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
                            )
                        })}
                    </Slider>
                }
            </div>
            </div>
            <div>
            <div style={{marginLeft: '3%'}} className='filter-box'><div className='filter'>내가 찜한 크루</div></div>
            <div>
                {
                    dibscrews===null?null:
                    <Slider {...settings}>
                        {sliceData(dibscrews).map((s) => {
                            return(
                                <div className="slide">
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
                            )
                        })}
                    </Slider>
                }
            </div>
            </div>
            <div>
            <div style={{marginLeft: '3%'}} className='filter-box'><div className='filter'>내가 뛴 크루</div></div>
            <div>
                {
                    pastcrews===null?null:
                    <Slider {...settings}>
                        {sliceData(pastcrews).map((s) => {
                            return(
                                <div className="slide">
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
                            )
                        })}
                    </Slider>
                }
            </div>
            </div>
        </div>
      <Footer></Footer>
    </div>
  );
}

export default RunningDetail;
