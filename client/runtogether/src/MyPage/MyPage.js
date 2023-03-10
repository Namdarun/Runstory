import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import BetweenBodyFooter from '../common/BetweenBodyFooter';
import Profile from './Profile'
import MyPageMsg from './MyPageMsg'

function MainPage() {
  return (
    <div>
      <Header></Header>
      <MyPageMsg></MyPageMsg>
      <Profile></Profile>
      <BetweenBodyFooter></BetweenBodyFooter>
      <BetweenBodyFooter></BetweenBodyFooter>
      <Footer></Footer>
    </div>
  );
}

export default MainPage;
