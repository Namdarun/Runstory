import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import {
  Avatar,
  Button,
  ChakraProvider, HStack, Spacer,
} from '@chakra-ui/react';
import './SettingBlock.css'
import {useNavigate} from 'react-router-dom'; 
import axios from '../api/axios';

function UserBlockList() {
  const [blocks, setBlocks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access-token") === null) { // 비회원 -> 로그인
        navigate("/user/login");
    }

    (async () => {
        const data = await axios.get(
            "feed/block/list"
        );
          // console.log(data.data.data)
          setBlocks(data.data.data)
        })();
  }, []);

  function BlockButton(blockuser) {
    const url = "feed/unblock/" + blockuser.blockId;
    axios.delete(url)
        .then(function(response) {
            // console.log("성공");
            window.location.replace("/setting-block")
        })
        .catch(function(error) {
            // console.log("실패");
        })

  }

  return (
    <ChakraProvider>
      <Header></Header>
      <div className='block-title' onClick={()=>navigate(-1)}>
          ←
      </div>
      <div style={{margin:"20px"}}>
      {
        blocks.map(function(blockuser) {
          var userurl = "http://i8a806.p.ssafy.io/runstory/user/" + blockuser.blocked.profileImgFileName
          return (
            <div style={{marginBottom:"20px"}}>
              <HStack>
                <Avatar 
                    isCentered
                    size={'sm'}
                    src={userurl}
                    style={{border: '2px solid #6A6A6A'}} />
              {/* <img alt='왜없죵..' src={userurl}/> */}
              <div>{blockuser.blocked.userNickname}</div>
              <Spacer />
              <button onClick={()=>BlockButton(blockuser)}>차단 취소</button>
              </HStack>
            </div>
          )
        })
      }
      </div>
      <Footer></Footer>
    </ChakraProvider>
  )
}

export default UserBlockList;