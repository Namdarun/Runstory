import React, { useState, useEffect, useRef } from 'react';
import {
  Image, Card, CardBody, useDisclosure, CardHeader, CardFooter, Modal,
  ModalOverlay, ModalHeader, ModalContent, ModalBody, ModalCloseButton,
  ModalFooter, Button, Input
} from '@chakra-ui/react';
import './ChattingRoomList.css';
import * as StompJs from "@stomp/stompjs";
import MsgByMe from './MsgByMe'
import MsgByOther from './MsgByOther'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChattingRoom = ({ yourSeq, yourNickname, yourProfileImg }) => {
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 내정보
  const [mySeq, setMySeq] = useState(1);
  const [myNickname, setMyNickname] = useState("나");
  const [myProfileImg, setMyProfileImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

  // 상대방 정보
  // const [yourSeq, setYourSeq] = useState(0);
  // const [yourNickname, setYourNickname] = useState("상대방 닉네임");

  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(0);

  useEffect(async () => {
    if (localStorage.getItem("access-token") === null) { // 비회원 -> 로그인
      window.location.href("/user/login");
    }

    const data = await axios.get(
      "https://i8a806.p.ssafy.io/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`
      }
    }
    )
    setMySeq(data.data.data.userSeq);

    // console.log("yourNickname : " + yourNickname + " yourSeq : " + yourSeq)

    const room = await axios.get(
      `https://i8a806.p.ssafy.io/api/chatroom/createroom/${yourSeq}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`
      }
    }
    )
    setRoomId(room.data.data);
  }, []);



  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "wss://i8a806.p.ssafy.io/api/ws-stomp", // 웹소켓 서버로 직접 접속
      // brokerURL: "ws://localhost:8080/ws-stomp", // 웹소켓 서버로 직접 접속
      connectHeaders: {
        "Authorization": localStorage.getItem("access-token")
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        init();
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });
    client.current.activate();
  };


  // 웹소켓 연결 끊기
  const disconnect = () => {
    setChatMessages([]);
    client.current.deactivate();
  };

  // 메시지 수신
  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room/` + roomId, ({ body }) => {
      setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
    });
  };

  // 메시지 발신
  const publish = (message) => {
    if (!client.current.connected) {
      return;
    }
    let date = new Date();
    client.current.publish({
      destination: "/pub/sendMessage",
      body: JSON.stringify({
        type: "ENTER",
        userSeq: mySeq,
        roomId: roomId,
        sender: myNickname,
        message: message,
        time: date
      }),
    });
    setMessage("");
  }

  // 이전 메시지 가져오기
  const init = () => {
    if (!client.current.connected) {
      return;
    }
    client.current.publish({
      destination: "/pub/enterUser",
      body: JSON.stringify({
        type: "TALK",
        userSeq: yourSeq,
        roomId: roomId,
        sender: yourNickname,
        message: "",
        time: ""
      }),
    });
  }


  // 모달 닫기
  function closeModal() {
    disconnect();
    onClose();
  }

  // 모달 열기
  function openModal() {
    connect();
    onOpen();
  }

  return (
    <>
      <div className='chat-btn' onClick={openModal} >채팅</div>
      <Modal
        isCentered
        onClose={closeModal}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        size='sm'
        scrollBehavior='inside'
        trapFocus='false'
        id='chat-modal'>

        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{yourNickname} 님과의 채팅방</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {chatMessages && chatMessages.length > 0 && (
              <>
                {chatMessages.map((_chatMessage, index) => (
                  _chatMessage.userSeq == mySeq ? <MsgByMe msg={_chatMessage.message} sender={"나"} src={myProfileImg}></MsgByMe>
                    :
                    <MsgByOther msg={_chatMessage.message} sender={_chatMessage.sender} src={yourProfileImg}></MsgByOther>

                ))}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <div margin='0 auto' className='comment-form'>
              <Input className='comment-input' placeholder='채팅을 입력해주세요' size='xs' width={'80%'}
                ttype={"text"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.which === 13 && publish(message)}
              ></Input>
              <Button className='submit-btn' onClick={() => publish(message)} margin-left='2%' size='xs'><p>전송</p></Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChattingRoom;