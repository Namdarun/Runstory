import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import NoticePageMsg from './NoticePageMsg';
import NoticeList from './NoticeList';

function RunningCrewList() {
  return (
      <div>
        <Header></Header>
        <NoticePageMsg></NoticePageMsg>
        <NoticeList></NoticeList>
        <Footer></Footer>
      </div>
  );
}

export default RunningCrewList;
