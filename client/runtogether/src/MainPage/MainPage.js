import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import RecommendMsg from './RecommendMsg';
import TempFeed from './TempFeed';

function MainPage() {
  return (
    <div style={{width: "90%"}}>
      <Header></Header>
      <RecommendMsg></RecommendMsg>
      <TempFeed></TempFeed>
      <Footer></Footer>
    </div>
  );
}

export default MainPage;
