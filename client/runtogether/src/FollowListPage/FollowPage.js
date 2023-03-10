import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';  
import Followers from './FollowerList';
import Followings from './FollowingList';
import FollowListPageMsg from './FollowListPageMsg';
import { 
  ChakraProvider,
  Tabs,
   TabList,
   TabPanels, 
   Tab, 
   TabPanel } from '@chakra-ui/react'
   import axios from '../api/axios';
   import {Link,useParams} from 'react-router-dom'
  
// 들어가면 보이는 메인페이지  
const FollowPage= () => {
  const [followList, setFollowList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  const {userId} = useParams();
  // console.log(userId);

  useEffect(() => {

    (async () => { // 피드 주인
        const data = await axios.get(
            "https://i8a806.p.ssafy.io/api/feed/follow/" + userId,
        );
        // console.log(data.data.data);
        const follow = data.data.data.followings;
        // follow.map((f)=>{
        //   console.log(f)
        //   setFollowList(...followList, f);
        // })
        
        setFollowList(data.data.data.followings);
        setFollowerList(data.data.data.followers);
        
      })();
  }, []);



  return (
    <ChakraProvider>
      <Header></Header>
      <FollowListPageMsg></FollowListPageMsg>
      <Tabs variant='enclosed'>
      <TabList>
        <Tab>팔로워</Tab>
        <Tab>팔로잉</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Followers followerList={followerList}/>
        </TabPanel>
        <TabPanel>
          <Followings followList={followList}/>
        </TabPanel>
      </TabPanels>
      </Tabs>
      <Footer></Footer>
    </ChakraProvider>
  )
}

export default FollowPage;

