import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './Feed.css';
import {
    Card, // chakra-ui의 Card로 피드 하나를 구성할 것임
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Button,
    CardBody,
    CardFooter,
    useDisclosure
} from '@chakra-ui/react';
import axios from '../api/axios';

function Comment({comments, feedId}) {
    const [comment, setComment] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    
    // 댓글 작성
    async function postComment() {
        await axios.post("/feed/comment", {id: feedId, content: comment});
        window.location.reload();
    }

    // 댓글 삭제
    async function deleteComment(commentId) {
        await axios.delete("/feed/comment/"+commentId);
        window.location.reload();
    }

    const handleCommentChange = ({ target: { value } }) => setComment(value); // 댓글 작성 시 내용 설정

    const handleSubmit = (e) => { // 작성 버튼 클릭 시 이벤트 함수
        postComment(comment);
    };
    return (
        <>
        <ModalOverlay />
                <ModalContent>
                <ModalHeader size='xs'>댓글</ModalHeader>
                <ModalCloseButton />
                <ModalBody border='2px' borderColor='gray.200'>
                    <div className="comments">
                        {comments.map((item, idx) => {
                        let img = item.simpleUserResDto.profileImgFileName;
                        let profileImgUrl = null;
                        if(img == null){
                            profileImgUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                        }else{
                            profileImgUrl = "https://i8a806.p.ssafy.io/runstory/user/" +item.simpleUserResDto.profileImgFileName;
                        }
                        return(
                            <Card direction={{base: 'row'}} width='100%' margin='0 auto' mt='10px' key={idx}>
                                <CardBody alignItems='center'>
                                    <div className='card-header-left'>
                                        <Image
                                            borderRadius='full'
                                            boxSize='30px'
                                            src={profileImgUrl}
                                        />
                                        <div className='comment-nickname'>{item.simpleUserResDto.userNickname}</div>
                                    </div>
                                    <div className='comment-content'>{item.content}</div>
                                    {/* <div style={{marginTop: '10px', fontSize: '12px'}}>답글 보기</div> */}
                                </CardBody>
                                <CardFooter>
                                    {/* <div className='comment-modify-btn'>수정</div> */}
                                    <div className='comment-delete-btn' onClick={onOpen}>삭제</div>
                                    <Modal isCentered isOpen={isOpen} onClose={onClose} size='xs' className='modal'>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>댓글 삭제</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                            댓글을 삭제하시겠습니까?
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme='red' mr={3} onClick={onClose}>
                                                    취소
                                                </Button>
                                                <Button variant='ghost' onClick={()=>{deleteComment(item.feedCommentId)}}>확인</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>                                
                                </CardFooter>
                            </Card>
                            )
                        })}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <form margin='0 auto' className='comment-form'
                    onSubmit={(e)=>{handleSubmit(e)}}>
                        <Input className='comment-input' placeholder='댓글을 입력해주세요' type='text' size='xs' width={'80%'}
                        name='comment'
                        value={comment}
                        onChange={handleCommentChange}></Input>
                        <Button className='submit-btn' type='submit' margin-left='2%' size='xs'><p>등록</p></Button>
                    </form>
                </ModalFooter>
                </ModalContent>
        </>
    );
}

export default Comment;