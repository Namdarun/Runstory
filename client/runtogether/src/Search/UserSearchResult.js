import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {
    Image, Card, CardBody, CardHeader, Spinner
  } from '@chakra-ui/react';
import './UserSearchResult.css';
import axioswithH from '../api/axios';

const UserSearchResult = ({keyword}) => {
    const [userResult, setUserResult] = useState([]);
    // useEffect(() => {
    //   (async () => {
    //     if (localStorage.getItem("access-token") === null) {  //비회원 조회 시
    //       alert("로그인이 필요한 페이지입니다.")
    //     }
    //   })();
    // }, [keyword]);

    useEffect(() => {
        (async () => {
          
          const data = await axioswithH({
            url: '/search',
            method: "POST",
            data: {
              type: 0, keyword: keyword, lastId: 1000
            },
            header: {
              Authorization: localStorage.getItem('access-token')
            }
        });
        setUserResult(data.data.data);
        })();
      }, [keyword]);

    return (
        <div className="user-search-result">
          {userResult.length===0?<p id='no-result' style={{display: 'none'}}>검색 결과가 없습니다</p>:""}
                {userResult.map((item) => {
                  // console.log("유저 아이디 : "+item.userId)
                    return(
                      <>
                        <a href={"/feed/" + item.userId}>
                        <Card direction={{base: 'row'}} width='90%' ms='5%' mt='10px' display='flex' justifyContent='center' alignItems='center'>      
                        <CardHeader>

                            {item.profileImgFileName===null?
                            <Image
                              boxSize='50px'
                              objectFit='cover'
                              object-position='top'
                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                              alt='no image'
                              borderRadius='50%'
                            />
                            :
                            <Image
                                boxSize='50px'
                                objectFit='cover'
                                object-position='top'

                                src={`https://i8a806.p.ssafy.io/runstory/user/`+item.profileImgFileName}
                                alt='no image'
                                borderRadius='50%'
                            />}
                            
                        </CardHeader>
                        <CardBody display='flex' textAlign={'left'} fontWeight={'bold'}>
                            {item.userNickname}
                        </CardBody>
                    </Card>
                    </a>
                  </>
                )
            })}
        </div>
    );
}

export default UserSearchResult;