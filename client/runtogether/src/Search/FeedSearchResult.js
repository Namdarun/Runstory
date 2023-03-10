import React, { useEffect, useState } from 'react';
import './FeedSearchResult.css';
import {NavLink} from "react-router-dom";
import {
    Image,
    useDisclosure,
    Card,
    CardHeader,
    CardBody
  } from '@chakra-ui/react';
import axioswithH from '../api/axios';


const FeedSearchResult = ({keyword}) => {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [feedResult, setFeedResult] = useState([]);
    const [arr, setArr] = useState([]);
    useEffect(() => {
        (async () => {
          // const data = null;
          // if (localStorage.getItem("access-token") === null) {  //비회원 조회 시
          //   alert("로그인이 필요한 페이지입니다.")
          // }
          // else { //회원 조회 시
            const data = await axioswithH({
                url: '/search',
                method: "POST",
                data: {
                    type: 1, keyword: keyword, lastId: 1000
                },
                header: {
                    Authorization: localStorage.getItem('access-token')
                }
            });
            var temp = sliceFeedResult(data.data.data);
            setFeedResult(temp);
          // }
    
          if (feedResult.length === 0) {
            return;
          }
        })();
      }, [keyword]);

    // feed result 3개씩 slice
    function sliceFeedResult(data) {
      const tempArr = [];
      for(let i = 0; i < data.length; i+=3) {
        tempArr.push(data.slice(i, i+3))
      }
      return tempArr;
    }
        
          // var row = `<tr>
          //             <td>${data[i].이름}</td>
          //             <td>${data[i].나이}</td>
          //             <td>${data[i].성별}</td>
          //            </tr>`
          // table.innerHTML += row
      

    return (
        <div className="user-search-result">
          <table border="1" className="imgs-table">
          {feedResult.map((item, idx) => {
            return(
              <tr>
              {item.map((i) => {
                //피드 상세 주소로 다시 맞춰줘야됨!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                return(
                  <td>
                    <NavLink to={"/feed/detail/" + i.feedId}> 
                    <Image
                    boxSize='100px'
                    objectFit='cover'
                    overflow='none'
                    src={`https://i8a806.p.ssafy.io/runstory/feeds/`+i.feedFiles[0].filePath}
                    alt='x'
                    borderRadius={5}/>
                  </NavLink>
                  </td>
                )
              })}
              
              </tr>
            )
          })}
          </table>
        </div>
        
    );
}

export default FeedSearchResult;