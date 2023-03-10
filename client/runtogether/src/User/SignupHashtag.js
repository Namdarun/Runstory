import React, {useState, useEffect} from 'react';
import {
  Button,
  ChakraProvider,
} from '@chakra-ui/react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import  {useNavigate} from 'react-router-dom'; 
import SignupHashtagMsg from './SignupHashtagMsg';
import  SignupHashtagList from './SignupHashtagList';

import './SignupHashtag.css'

function RegisterHashtag() {

  const navigate = useNavigate(); // navigate 변수 생성
  const navigateHome = () => { // 취소 클릭 시 홈으로 가기 위함
    navigate("/main");
  };

  return (
    <ChakraProvider>
        <Header></Header>
        <div>
        <SignupHashtagMsg></SignupHashtagMsg>
          <div className='signup-hashtag-list'>
          <SignupHashtagList></SignupHashtagList>

          <Button onClick={navigateHome} style={{margin:'0 auto', marginBottom:'50px'}}> 
          완료
          </Button>
          </div>
        </div>
        <Footer></Footer>
    </ChakraProvider>
  );
}

export default RegisterHashtag;