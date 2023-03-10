import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import BetweenBodyFooter from '../common/BetweenBodyFooter';
import Swiper from './Swiper'
import RunningCrewListPageMsg from './RunningCrewListPageMsg';


function RunningCrewList() {
  return (
      <div style={{width: '90%'}}>
        <Header></Header>
        <RunningCrewListPageMsg></RunningCrewListPageMsg>
        <Swiper></Swiper>
        <BetweenBodyFooter></BetweenBodyFooter>
        <Footer></Footer>
      </div>
  );
}

export default RunningCrewList;
