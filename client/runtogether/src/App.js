import React from 'react';
import {
    ChakraProvider,
    theme,
} from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import RunningCrewList from './RunningCrewList/RunningCrewList';
import CreateFeed from './CreateFeed/CreateFeed';
import RecruitCrew from './RecruitCrew/RecruitCrew';
import Search from './Search/Search';
import Feed from './Feed/Feed';
import FollowPage from './FollowListPage/FollowPage';
import SettingIntro from './SettingIntro/SettingIntro';
import AlarmSetting from './SettingAlarm/AlarmSetting';
import UserBlockList from './SettingBlock/SettingBlock';
import Question from './SettingQuestion/SettingQuestion';
// import MyPage from './SettingMyPage/SettingMyPage';
import Login from './User/Login';
import Register from './User/Signup';
import FindPwd from './User/FindPassword';
import RegisterHashtag from './User/SignupHashtag';
import Notice from './Notice/Notice';
import DrawMap from './DrawMap/DrawMap';
import Chatting from './Chatting/Chatting';
import RunningDetail from "./RunningDetail/RunningDetail";
import Oauth from "./User/OAuthRedirectHandler";
import FeedDetail from "./FeedDetail/FeedDetail";
import FeedComment from "./FeedComment/FeedComment";
import RunningMy from "./RunningMy/RunningMy"
import MyPage from './MyPage/MyPage'
import Landing from './common/SplashPage'
import RunningComment from './RunningCrewComment/RunningComment'
import ErrorPage from './404/ErrorPage';

import "./App.css";

function App() {
    return (
        <ChakraProvider theme={theme} className='body'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/main' element={<MainPage />} />
                    <Route path='/landing' element={<Landing />} />
                    <Route path='/user/login' element={<Login />} />
                    <Route path='/oauth/callback/kakao' element={<Oauth />} />
                    <Route path='/user/signup' element={<Register />} />
                    <Route path='/user/signup/hashtag' element={<RegisterHashtag />} />
                    <Route path='/user/findpassword' element={<FindPwd />} />
                    <Route path='/create-feed' element={<CreateFeed />} />
                    <Route path='/running-crew-list' element={<RunningCrewList />} />
                    <Route path='/create-running-crew' element={<RecruitCrew />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/feed/:userId' element={<Feed />} />
                    <Route path='/feed/follow/:userId' element={<FollowPage />} />
                    <Route path='/setting-intro' element={<SettingIntro />} />
                    <Route path='/setting-alarm' element={<AlarmSetting />} />
                    <Route path='/setting-block' element={<UserBlockList />} />
                    <Route path='/setting-question' element={<Question/>} />
                    <Route path='/user' element={<MyPage />} />
                    <Route path='/notice' element={<Notice />} />
                    <Route path='/draw-map' element={<DrawMap />} />
                    <Route path='/feed' element={<Feed />} />
                    <Route path='/running/detail/:runningId' element={<RunningDetail />} />
                    <Route path='/chatting' element={<Chatting />} />
                    <Route path='/feed/detail/:feedId' element={<FeedDetail />} />
                    <Route path='/feed/detail/:feedId/comment' element={<FeedComment />} />
                    <Route path='/running/detail/:runningId/comment' element={<RunningComment />} />
                    <Route path='/running/my' element={<RunningMy />} />
                    <Route path='/mypage' element={<MyPage />} />
                    <Route path='/errorpage' element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
            {/* <MainPage></MainPage> */}
            {/* <RunningCrewList></RunningCrewList> */}
            {/* <CreateFeed></CreateFeed> */}
            {/* <RecruitCrew></RecruitCrew> */}
        </ChakraProvider>
    );
}

export default App;
