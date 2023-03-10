import React, {useEffect, useState} from 'react';
import {
  ButtonGroup,
  ChakraProvider,
  theme
} from '@chakra-ui/react';
import { Button, Collapse, useDisclosure } from '@chakra-ui/react'
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserGroup, faCirclePlus, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
  const { isOpen, onToggle } = useDisclosure()
  const [isLogined, setIsLogined] = useState(false);
  const [userId, setUserId] = useState();
  function refreshToHome() {
    window.location.replace("/main")
  }

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("access-token") === null) { // 비회원 -> 로그인
        setIsLogined(false);
      }
      else { // 회원
        setIsLogined(true)
        const data = await axios.get(
          "https://i8a806.p.ssafy.io/api/user",{
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("access-token")}`
              }
          }
        )
        setUserId(data.data.data.userSeq);
      }
    })();
  }, []);

    return (
        <ChakraProvider theme={theme}>  
            <header className='footer'>
                <div className='home'><FontAwesomeIcon icon={faHome} onClick={refreshToHome} /></div>
                <a href='/running-crew-list'><div className='gather'><FontAwesomeIcon icon={faUserGroup} /></div></a>
                {/* <Link to='/create-feed'> */}
                  <div className='post' onClick={onToggle}><FontAwesomeIcon icon={faCirclePlus} />
          
                  </div>
                  
                {/* </Link> */}
                <a href="/search"><div className='navigate'><FontAwesomeIcon icon={faMagnifyingGlass} /></div></a>
                <Collapse in={isOpen} animateOpacity className='collapse'>
                  <ButtonGroup className='btn-group'>
                      <a href='/create-running-crew'>
                        <Button size='sm' className='running-crew-write' bg='#F4EBEB'>
                          러닝 크루 모집
                        </Button>
                      </a>
                      <a href='/create-feed'>
                        <Button size='sm' className='feed-write' bg='#F4EBEB'>
                          피드 작성
                        </Button>
                      </a>
                      <a href='/draw-map'>
                        <Button size='sm' className='map-draw' bg='#F4EBEB'>
                          지도 그리기
                        </Button>
                      </a>
                    </ButtonGroup>
                </Collapse>
                {isLogined?
                <a href={`/feed/${userId}`}> 
                  <div className='my-page'>
                  <FontAwesomeIcon icon={faUser} /></div>
                </a>
                :
                <a href='/user/login'> 
                  <div className='my-page'><FontAwesomeIcon icon={faUser} /></div>
                </a>
                }
            </header>
        </ChakraProvider>
      );
}

export default Footer;