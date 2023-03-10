import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import ChattingRoomList from './ChattingRoomList';
import ChattingPageMsg from './ChattingPageMsg';
// import ChattingRoom from './ChattingRoom';

function Chatting() {
    return (
          <div>
            <Header></Header>
            <ChattingPageMsg></ChattingPageMsg>
            <ChattingRoomList></ChattingRoomList>
            {/* <ChattingRoom></ChattingRoom> */}
            <Footer></Footer>
          </div>
      );
}

export default Chatting;