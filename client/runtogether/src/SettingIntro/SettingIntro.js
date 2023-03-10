import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import {
  Container,
  Divider,
  ChakraProvider,
  Button,
} from '@chakra-ui/react';
import './SettingIntro.css'
import SettingIntroMsg from './SettingIntroMsg';
import  {useNavigate} from 'react-router-dom'; 

const SettingIntro = () => {
  const navigate = useNavigate(); // navigate 변수 생성
  const navigateMypage = () => { 
    navigate("/user");
  };
  const navigateAlarm = () => {
    navigate("/setting-alarm");
  };
  const navigateBlock = () => {
    navigate("/setting-block");
  };
  const navigateQuestion = () => {
    navigate("/setting-question");
  };
  const navigateLogout = () => {
    localStorage.removeItem('access-token');
    navigate("/main");
  };

  return (
    <ChakraProvider>
      <Header></Header>
      <div className='setting-intro-title'>
          개인설정페이지
      </div>
            <Container>
            <div className='setting-detail'> 
              <Button style={{fontSize:'20px'}} onClick={navigateMypage}> 
              마이페이지
               </Button>
              <Divider mt='10px' w='50%' ml='25%'/>
              <Button style={{fontSize:'20px'}} onClick={navigateBlock}> 
              차단설정
               </Button>
              <Divider mt='10px' w='50%' ml='25%'/>
              <Button style={{fontSize:'20px'}} onClick={navigateAlarm}> 
              알림설정
              </Button>
              <Divider mt='10px' w='50%' ml='25%'/>
              <Button style={{fontSize:'20px'}} onClick={navigateQuestion}> 
              문의하기
               </Button>
              <Divider mt='10px' w='50%' ml='25%'/>
              <Button style={{fontSize:'20px'}} onClick={navigateLogout}> 
              로그아웃
               </Button>
            </div>
            </Container>
      <Footer></Footer>
    </ChakraProvider>
  )
}

export default SettingIntro;




