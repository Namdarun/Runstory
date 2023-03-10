import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
const theme = {
    background: '#ffffff',
    headerBgColor: '#CBD9E7',
    headerFontColor: '#6a6a6a',
    headerFontSize: '15px',
    botBubbleColor: '#CBD9E7',
    botFontColor: '#6a6a6a',
    userBubbleColor: '#EEB6B6',
    userFontColor: '#6a6a6a',
  };
const ChattingBot = () => {
    return (
        <ThemeProvider theme={theme}>
        <ChatBot 
            botAvatar="https://t.pimg.jp/058/210/521/5/58210521.jpg" 
            botDelay="1300" 
            userAvatar="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            placeholder=""
            hideSubmitButton="true"
            headerTitle="RUNSTORY 챗봇 🏃‍♂️🏃‍♀️"
            steps={[
                {
                id: '1',
                message: 'RUNSTORY에 오신 것을 환영합니다! 무엇을 도와드릴까요?',
                trigger: '2',
                },
                {
                id: '2',
                message: 'RUNSTORY는 같이 러닝 크루를 구하거나 추천 받고, 인증도 가능하며, 피드를 게시할 수 있는 산책 전용 SNS입니다!',
                trigger: 'help'
                },
                {
                id: 'help',
                options: [
                    {value: 'running-crew', label: '러닝 크루가 뭐야?', trigger: 'about-running-crew'},
                    {value: 'feed', label: '피드가 뭐야?', trigger: 'about-feed'},
                    {value: 'how-to-auth', label: '인증은 어떤 방식으로 해?', trigger: 'auth-way'},
                    {value: 'level', label: '인증하면 뭐가 좋아?', trigger: 'why-auth'},
                    {value: 'how-to-search', label: '검색은 어떻게 진행해?', trigger: 'why-search'},
                    {value: 'how-to-create-feed', label: '피드등록은 어떻게 해?', trigger: 'make-feed'},
                    {value: 'how-to-create-crew', label: '러닝크루는 어떻게 만들어?', trigger: 'make-crew'},
                    {value: 'how-to-chat', label: '채팅은 어떻게 해?', trigger: 'how-chat'},

                ]
                },
                {
                    id: 'about-running-crew',
                    message: '러닝 크루는 같이 산책하는 사람들을 말해요!',
                    trigger: 'about-running-crew2'
                },
                {
                    id: 'about-running-crew2',
                    message: 'RUNSTORY에서는 러닝 크루 모집글 작성을 통해 러닝 크루를 나이, 성별 별로 꾸릴 수 있어요!',
                    trigger: 'about-running-crew3'
                },
                {
                    id: 'about-running-crew3',
                    message: '참여하고 싶은 크루가 있다면 예약 버튼을 눌러 같이 뛰어보세요!',
                    trigger: 'anything-else'
                },
                {
                    id: 'about-feed',
                    message: '피드는 러닝 크루 모집글과는 조금 다른 개념이에요!',
                    trigger: 'about-feed2'
                },
                {
                    id: 'about-feed2',
                    message: '러닝 크루를 모집하는 목적이 아닌 모든 글은 피드로 작성할 수 있어요!',
                    trigger: 'about-feed3'
                },
                {
                    id: 'about-feed3',
                    message: '피드에서는 좋아요나 댓글을 남겨 사람들과 소통할 수 있어요!',
                    trigger: 'about-feed4'
                },
                {
                    id: 'about-feed4',
                    message: "여러 사람들과 소통하며 운동 취미 생활을 공유해보세요!",
                    trigger: 'anything-else'
                },
                {
                    id: 'auth-way',
                    message: '산책 인증은 출발지에서 인증 버튼을 누름으로써 이루어져요!',
                    trigger: 'auth-way2'
                },
                {
                    id: 'auth-way2',
                    message: '출발지에서 1.5km 이내가 아닐 경우 인증이 불가합니다!',
                    trigger: 'anything-else'
                },
                {
                    id: 'why-auth',
                    message: '인증을 하면 산책한 거리만큼 경험치가 올라요!',
                    trigger: 'why-auth2'
                },
                {
                    id: 'why-auth2',
                    message: '경험치가 어느 정도 올라가면 레벨업이 됩니다!',
                    trigger: 'why-auth3'
                },
                {
                    id: 'why-auth3',
                    message: '레벨업에 따라 맨발→짚신→고무신→캔버스→날개신 아이콘이 개인 피드 페이지에 나타납니다!',
                    trigger: 'why-auth4'
                },
                {
                    id: 'why-auth4',
                    message: '경험치를 쌓아 친구들과 경쟁해보세요!',
                    trigger: 'anything-else'
                },
                {
                    id: 'anything-else',
                    message: '이외에 또 궁금한 것이 있으신가요?',
                    trigger: 'yes-or-no'
                },
                {
                    id: 'why-search',
                    message: '검색 기능은 유저 / 피드 / 러닝크루 세가지를 찾을 수 있습니다.',
                    trigger: 'why-search2'
                },
                {
                    id: 'why-search2',
                    message: '유저 검색은 유저 닉네임 중 일부를 검색하면 찾을 수 있습니다.',
                    trigger: 'why-search3'
                },
                {
                    id: 'why-search3',
                    message: '피드 검색은 해시태그를 통해서 검색하여 찾을 수 있습니다.',
                    trigger: 'why-search4'
                },
                {
                    id: 'why-search4',
                    message: '러닝 크루는 크루명을 통하여 검색하여 찾을 수 있습니다.',
                    trigger: 'anything-else'
                },
              {
                id: 'make-feed',
                message: '피드를 만들기 위해서는 중간의 +버튼을 눌러주세요!',
                trigger: 'make-feed2'
              },
              {
                id: 'make-feed2',
                message: '누를시 3개의 버튼이 뜨게되는데 피드작성 버튼을 눌러주세요.',
                trigger: 'make-feed3'
              },
              {
                id: 'make-feed3',
                message: '사진을 추가하시고, 내용, 해시태그를 선택하시고 공개범위를 골라주세요 .',
                trigger: 'make-feed4'
              },
              {
                id: 'make-feed4',
                message: '등록을 눌러주시면 피드가 등록되고 내 피드에 가시면 확인하실 수 있습니다.',
                trigger: 'anything-else'
              },
              {
                id: 'make-crew',
                message: '러닝크루를 만들기 위해서는 중간의 +버튼을 눌러주세요!',
                trigger: 'make-crew2'
              },
              {
                id: 'make-crew2',
                message: '누를시 3개의 버튼이 뜨게되는데 러닝크루 모집 버튼을 눌러주세요.',
                trigger: 'make-crew3'
              },
              {
                id: 'make-crew3',
                message: '사진을 추가하시고, 내용, 해시태그를 선택하시고 출발,도착지, 연령대와 인원을 골라주세요 .',
                trigger: 'make-crew4'
              },
              {
                id: 'make-crew4',
                message: '등록을 눌러주시면 러닝크루가 등록되고 내 러닝크루에 가시면 확인하실 수 있습니다.',
                trigger: 'anything-else'
              },
              {
                id: 'how-chat',
                message: '채팅 기능을 사용하기 위해서는 오른쪽 위의 채팅모양을 눌러주세요.',
                trigger: 'how-chat2'
              },
              {
                id: 'how-chat2',
                message: '누를시 채팅 가능한 사람들 명단이 뜨게 됩니다.',
                trigger: 'how-chat3'
              },
              {
                id: 'how-chat3',
                message: '그 사람들 중 채팅하고 싶은 사람을 선택합니다 .',
                trigger: 'how-chat4'
              },
              {
                id: 'how-chat4',
                message: '그 후 채팅을 진행하시면 됩니다.',
                trigger: 'anything-else'
              },
                {
                    id: 'yes-or-no',
                    options: [
                        {value: 'yes', label: '있어!', trigger: 'help'},
                        {value: 'no', label: '없어!', end: true},
                    ]
                }
            ]}
        />
        </ThemeProvider>
    );
}

export default ChattingBot;
