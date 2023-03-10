// 개인 문의 페이지import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import './SettingQuestion.css'

const Question = () => {
  return (
    <ChakraProvider>
      <Header></Header>
      <div className='settingquestion-title'>
          알림설정
      </div>
      <Footer></Footer>
    </ChakraProvider>
  )
}

export default Question;
