import React from 'react';
import {
    Image,
    ChakraProvider,
    theme,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody
} from '@chakra-ui/react';
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // fontawesome 사용
import { faRobot } from "@fortawesome/free-solid-svg-icons"; // 로고(사람 달리는 아이콘)
import {faHeart, faCommentDots, faCircleQuestion} from "@fortawesome/free-regular-svg-icons" // 알림(하트), 채팅 버튼
import { Link } from 'react-router-dom';
import ImageFile  from './검흰흰누끼.png';
import ChattingBot from '../ChatBot/ChatBot';


const Header = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    function openClose() {
        if(isOpen) {
            onClose();
        }
        else {
            onOpen();
        }
    }
    return (
        <ChakraProvider theme={theme}>
            <Modal isOpen={isOpen} onClose={onClose} size='full' scrollBehavior='inside' isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>챗봇</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ChattingBot style={{width: '100%', height: '80%'}}></ChattingBot>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <header className='header'>
                <div className='left-header'>
                    <button onClick={openClose}><FontAwesomeIcon icon={faCircleQuestion} /></button>
                </div>
                <a href='/main'><Image className='logo' src={ImageFile} style={{textAlign: 'center'}}/></a>
                <div className='right-header'>
                    <div className='notice'><a href="/notice"><FontAwesomeIcon icon={faHeart} /></a></div>
                    <div className='chat'><a href="/chatting"><FontAwesomeIcon icon={faCommentDots} /></a></div>
                </div>
            </header>
        </ChakraProvider>
    );
}

export default Header;
