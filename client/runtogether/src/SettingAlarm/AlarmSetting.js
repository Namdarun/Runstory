import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Alarm from './AlarmSettingBody';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import './AlarmSetting.css'
import { useNavigate } from 'react-router-dom';

const AlarmSetting = () => {
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <Header></Header>
      <div className='alarm-intro-title' onClick={()=>navigate(-1)}>
          ←
      </div>
      <Alarm></Alarm>
      <Footer></Footer>
    </ChakraProvider>
  )
}

export default AlarmSetting;
