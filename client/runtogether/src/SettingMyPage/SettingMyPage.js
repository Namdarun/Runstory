// 마이페이지
import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import './SettingMyPage.css';
import SettingMyPagePhoto from './SettingMyPagePhoto';
import DeleteProfileButton from './DeleteProfileButton';

function MyPage() {
  return (
    <ChakraProvider>
      <Header></Header>
      <div className='user-title'>
          마이페이지
      </div>
      <SettingMyPagePhoto></SettingMyPagePhoto>
      {/* delete 버튼 안뜸... */}
      <DeleteProfileButton></DeleteProfileButton> 
      <Footer></Footer>
    </ChakraProvider>
  )
}

export default MyPage;