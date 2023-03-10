import React, {useEffect, useState} from 'react';
import './Feed.css';
import {
    Card, // chakra-ui의 Card로 피드 하나를 구성할 것임
    Image,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Button,
    CardBody,
  } from '@chakra-ui/react';
import axios from 'axios';

function Recomment({recomments, commentId}) {
    const [recomment, setRecomment] = useState([]);

    // 댓글 작성
    async function postRecomment() {
        await axios.post(""+commentId, {
            commentId: commentId,
            content: recomment
        });
    }
    // async function deleteComment() {
    //     await axios.post(""+feedId, {
    //         commentId: commentId
    //     });
    // }
    // async function putComment() {
    //     await axios.post(""+feedId, {
    //         feedId: feedId,
    //         content: comment
    //     })Z;
    // }


    const handleCommentChange = ({ target: { value } }) => setRecomment(value); // 댓글 작성 시 내용 설정
  
    const handleSubmit = (e) => { // 작성 버튼 클릭 시 이벤트 함수
        alert(`댓글번호: ${commentId}, 작성된 내용: ${recomment}`); // 데이터 잘 들어왔는지 확인용!!!
        postRecomment(recomment);
    };
    return (
        <>
        <ModalOverlay />
                <ModalContent>
                <ModalHeader size='xs'>답글</ModalHeader>
                <ModalCloseButton />
                <ModalBody border='2px' borderColor='gray.200'>
                    <div className="comments">
                        {recomments.map((item, idx) => {
                        return(
                            <Card direction={{base: 'row'}} width='100%' margin='0 auto' mt='10px' key={idx}>
                                <CardBody alignItems='center'>
                                    <div className='card-header-left'>
                                        <Image
                                            borderRadius='full'
                                            boxSize='30px'
                                            src='https://w.namu.la/s/40cc83425a4a01e5438c620e76e401e3a633852d65e19254fc99a840c013674ec1565de5b0426fc4c83402b4ef9e3a3dcf963ee0d69684de9305c7c9504d10ffcdc88bfe22624226d9a85b2976abed1f19b59aadee927a4c369d41825ebcf2ad'
                                            alt='Dan Abramov'
                                        />
                                        <div className='comment-nickname'>{item.userNickname}</div>
                                    </div>
                                    <div className='comment-content'>{item.content}</div>
                                </CardBody>
                            </Card>
                            )
                        })}    
                    </div>
                </ModalBody>
                <ModalFooter>
                    <form margin='0 auto' className='comment-form'
                    onSubmit={(e)=>{handleSubmit(e)}}>
                        <Input className='comment-input' placeholder='댓글을 입력해주세요' type='text' size='xs' width={'80%'}
                        name='recomment'
                        value={recomment}
                        onChange={handleCommentChange}></Input>
                        <Button className='submit-btn' type='submit' margin-left='2%' size='xs'><p>등록</p></Button>
                    </form>
                </ModalFooter>
                </ModalContent>
        </>
    );
}

export default Recomment;