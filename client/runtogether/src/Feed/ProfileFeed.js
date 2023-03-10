import React, {useState, useEffect} from 'react';
import './ProfileFeed.css';
import {Image ,ChakraProvider} from '@chakra-ui/react'
import Imgfile from './이미지1.png';
import axioswithH from '../api/axios';
import {NavLink} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const ProfileFeed = (props) => {
    const navigate = useNavigate();
    const [feedResult, setFeedResult] = useState([]);
    const [arr, setArr] = useState([]);
    useEffect(() => {
        (async () => {
          if (localStorage.getItem("access-token") === null) {  //비회원 조회 시
            window.location.replace('/user/login')
          }
          else { //회원 조회 시
            const data = await axioswithH({
                url: '/feed/'+(props.userId),
                method: "GET"
            });
            var temp = sliceFeedResult(data.data.data);
            setFeedResult(temp);
          }
    
          if (feedResult.length === 0) {
            return;
          }
        })();
      }, []);

    // feed result 3개씩 slice
    function sliceFeedResult(data) {
      const tempArr = [];
      
      for(let i = 0; i < data.length; i+=3) {
        tempArr.push(data.slice(i, i+3))
      }

    if(tempArr[0].length===1) {
      tempArr[0].push({feedId: -1, feedFiles: [{filePath: ""}]})
      tempArr[0].push({feedId: -1, feedFiles: [{filePath: ""}]})
    }
    else if(tempArr[0].length===2) {
      tempArr[0].push({feedId: -1, feedFiles: [{filePath: ""}]})
    }
    // console.log(tempArr)
    return tempArr;
    }

  return (
    // <ChakraProvider>
    <div className='wrapper' style={{maxHeight: '60vh', overflow: 'scroll', marginTop: '3%'}}>
      <table border="1" className='imgs-table'>
      {feedResult.map((item, idx) => {
            return(
              <tr>
              {item.map((i) => {
                return(
                  <td>
                    {i.feedId===-1?
                    <div style={{width: '100px', height: '100px'}}>
                    </div>
                    :
                    <a href={`/feed/detail/${i.feedId}`}> 
                    <Image
                    boxSize='100px'
                    objectFit='cover'
                    overflow='none'
                    src={`https://i8a806.p.ssafy.io/runstory/feeds/`+i.feedFiles[0].filePath}
                    alt='x'
                    borderRadius={5}
                    style={{border: '0.5px solid #8a8a8a'}}/>
                    </a>
                    }     
                  </td>
                )
              })}
              
              </tr>
            )
          })}
    </table>
    </div>
    // </ChakraProvider>
    )
};
export default ProfileFeed;