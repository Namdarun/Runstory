import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ArticleForm.css';
import { Img, Radio, RadioGroup } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import ImgUpload from '../RecruitCrew/ImgUpload';
import HashTag from './HashTag.js';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
  } from '@chakra-ui/react';
import axios from 'axios';

const ArticleForm = () => {
    const accessToken = localStorage.getItem("access-token");

    const [value, setValue] = useState('PUBLIC'); // 공개 범위 (1: 전체공개, 2: 친구공개, 3: 비공개)
    const [content, setContent] = useState(""); // 피드 내용
    const [selectedHashtagsId, setSelectedHashtagsId] = useState(new Set()); // 해시태그
    const [selectedHashtagsName, setSelectedHashtagsName] = useState(new Set()); // 해시태그
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [image, setImage] = useState([]);
    const [preview, setPreview] = useState([]);
    

    const handleContentChange = ({ target: { value } }) => setContent(value); // 글 작성 시 content 설정

    const handleSubmit = (event) => { // 작성 버튼 클릭 시 이벤트 함수
        event.preventDefault();
        var selectedHashTags = Array.from(selectedHashtagsId)
        registerFeed(content, value, selectedHashTags);
    };

    async function registerFeed(content, value, selectedHashTags) {
      const formData = new FormData();
      // var temp = {'content': content, 'publicScope': value, 'selectedHashTags': selectedHashTags}
      // console.log("이미지 : "+image)
      image.forEach((file)=>formData.append('files', file))
      formData.append('content', content);
      formData.append('publicScope', value);
      formData.append('selectedHashTags', selectedHashTags);
      const data = await axios({
          url: 'https://i8a806.p.ssafy.io/api/feed',
          // url: 'http://localhost:8080/feed',            
          method: "post", data: formData,
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` } });

    navigate("/main");
    }

    // const handleButtonClick = e => {
    //     fileInput.current.click();
    // };
      
    // const handleImgChange = e => {
    //     console.log(e.target.files[0]);
    // };

    const navigate = useNavigate();
 
    const navigateHome = () => {
      navigate("/main");
    };

    return (
      // enctype="multipart/form-data"
       <form className='article-form' onSubmit={handleSubmit}>   
            <ImgUpload image={image} setImage={setImage} preview={preview} setPreview={setPreview}></ImgUpload>
            <HashTag selectedHashtagsId={selectedHashtagsId} selectedHashtagsName={selectedHashtagsName}></HashTag>
            <div className='content-and-range'>
            <div className='content' type='text'>CONTENT</div>
                <div className='range'>
                    <RadioGroup onChange={setValue} value={value} className='radio-range' colorScheme={'pink'}>
                        <Radio size='sm' value='PUBLIC' mx={1} defaultChecked>전체 공개</Radio>
                        <Radio size='sm' value='FRIEND' mx={1}>팔로워 공개</Radio>
                        <Radio size='sm' value='PRIVATE' mx={1}>비공개</Radio>
                    </RadioGroup>
                </div>
            </div>
            <textarea className='content-input' name='content' value={content} onChange={handleContentChange} placeholder='내용을 입력해주세요' rows="6"></textarea>
            <div className='submit-and-cancel'>
                <button className='submit-btn' type='submit'><p>등록</p></button>
                <button className='cancel-btn' type='button' onClick={onOpen}><p>취소</p></button>
            </div>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size='xs' className='modal'>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>경고</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                작성중인 글이 모두 지워집니다. 그래도 나가시겠습니까?
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='red' mr={3} onClick={onClose}>
                    취소
                  </Button>
                  <Button variant='ghost' onClick={navigateHome}>확인</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
        </form>
        
    );
}

export default ArticleForm;
