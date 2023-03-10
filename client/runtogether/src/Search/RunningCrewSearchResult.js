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


const RunningCrewSearchResult = ({keyword}) => {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [runningCrewResult, setRunningCrewResult] = useState([]);

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
                    type: 2, keyword: keyword, lastId: 1000
                },
                header: {
                    Authorization: localStorage.getItem('access-token')
                }
            });
            var temp = sliceRunningCrewResult(data.data.data);
            setRunningCrewResult(temp);
          // }
    
          if (runningCrewResult.length === 0) {
            return;
          }
        })();
      }, [keyword]);
      
      // running crew result 3개씩 slice
    function sliceRunningCrewResult(data) {
      const tempArr = [];
      for(let i = 0; i < data.length; i+=3) {
        tempArr.push(data.slice(i, i+3))
      }
      return tempArr;
    }


    return (
        <div className="user-search-result">
          <table border="1" className="imgs-table">
          {runningCrewResult.map((item, idx) => {
            return(
              <tr>
              {item.map((i) => {
                return(
                  <NavLink to={"/running/detail/" + i.runningId}>
                  <td>
                    <Image
                    boxSize='100px'
                    objectFit='cover'
                    overflow='none'
                    src={`https://i8a806.p.ssafy.io/runstory/running/`+i.imgFileName}
                    alt='x'
                    borderRadius={5}/>
                  </td>
                  </NavLink>
                )
              })}
              </tr>
            )
          })}
          </table>
        </div>
    );
}

export default RunningCrewSearchResult;