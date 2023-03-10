import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Avatar, Box, Button, ChakraProvider, Spacer, Input } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { NavLink, useParams } from 'react-router-dom';
import axios from '../api/axios'
import { ChevronRightIcon } from '@chakra-ui/icons';
import FeedCommentPageMsg from './FeedCommentPageMsg';

function RunningDetail() {
    const { feedId } = useParams();
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [recommentContent, setRecommentContent] = useState("");

    
    const handleCommentContentChange = ({ target: { value } }) => setCommentContent(value); // 댓글 작성 시 내용 설정
    const handleRecommentContentChange = ({ target: { value } }) => setRecommentContent(value); // 답글 작성 시 내용 설정

    useEffect(() => {
        (async () => {
            const url = "feed/comment/" + feedId;
            const data = await axios.get(url)
                .then(function (response) {
                    setComments(response.data.data);
                    // console.log(response.data.data)
                    // console.log("성공");
                })
                .catch(function (error) {
                    // console.log("실패");
                })
        })();
    }, []);
    // var profileurl = "https://i8a806.p.ssafy.io/runstory/user/" + feeds.profileImgFileName;
    // var feedurl = "https://i8a806.p.ssafy.io/runstory/feeds/" + feedfiles.filePath;
    // var commentsurl = "https://i8a806.p.ssafy.io/runstory/user/" + user.profileImgFileName;

    // 댓글 작성
    async function postComment() {
        await axios.post("/feed/comment", {id: feedId, content: commentContent});
        window.location.reload();
    }

    // 답글 작성
    async function postRecomment(commentId) {
        await axios.post("/feed/comment/recomment", {id: commentId, content: recommentContent});
        window.location.reload();
    }

    // 댓글 삭제
    async function deleteComment(commentId) {
        await axios.delete("/feed/comment/"+commentId);
        window.location.reload();
    }

    const handleSubmit = (e) => { // 작성 버튼 클릭 시 이벤트 함수
        postComment(commentContent);
    };    

    const handleSubmit2 = (commentId, e) => { // 작성 버튼 클릭 시 이벤트 함수
        console.log(commentId)
        
        postRecomment(commentId, recommentContent);
    };    

    function openRecomment(commentId) {
        console.log(commentId)
        var recommentForm = document.getElementById(commentId);
        if(recommentForm.style.display==='block') {
            recommentForm.style.display = 'none'
        }
        else {
        recommentForm.style.display = 'block';
        }
    }

    return (
        <ChakraProvider>
            <Header></Header>
            <FeedCommentPageMsg></FeedCommentPageMsg>
            <div>
                <div style={{ borderBottom: "5%", maxHeight: '71vh', overflow: 'scroll'}}>
                    {
                        comments.map(function (r) {
                            var url = "https://i8a806.p.ssafy.io/runstory/user/" + r.simpleUserResDto.profileImgFileName;
                            return (
                                <div style={{ paddingLeft: "3%", paddingRight: "3%", borderRadius: "30px", marginBottom: "5%" }}>
                                    <div style={{ borderRadius: "10px", backgroundColor: "#E1EBFF" }}>
                                        <div style={{ borderRadius: "10px", backgroundColor: "#E1EBFF" }}>
                                            <a href={"/feed/" + r.simpleUserResDto.userId}>
                                                <HStack spacing='24px'>
                                                    <Avatar
                                                        isCentered
                                                        size={'xs'}
                                                        src={url}
                                                        style={{ border: '2px solid #6A6A6A' }} />
                                                    <div style={{ marginLeft: "5%", marginTop: "0px", fontSize: "13px" }}>{r.simpleUserResDto.userNickname}</div>
                                                </HStack>
                                            </a>
                                        </div>
                                        <div style={{ paddingLeft: "10%" }}>
                                            {r.content}
                                        </div>
                                        <div style={{marginLeft: '10%'}} onClick={()=>openRecomment(r.feedCommentId)}>
                                            {/* {console.log(r)} */}
                                            ↪ 답글 달기
                                        </div>
                                        <form margin='0 auto' className='recomment-form' id={r.feedCommentId}
                                            onSubmit={(e)=>{handleSubmit2(r.feedCommentId, e)}} style={{display: 'none'}}>
                                            <Input className='comment-input' placeholder='답글을 입력해주세요' type='text' size='xs' width={'80%'}
                                            name='recomment'
                                            onChange={handleRecommentContentChange}
                                            ></Input>
                                            <Button className='submit-btn' type='submit' margin-left='2%' size='xs'><p>등록</p></Button>
                                        </form>
                                    </div>
                                    <hr style={{ margin: "10px" }} />
                                    <div>
                                        {r.feedRecomments.map(function (recomment) {
                                            var recommenturl = "https://i8a806.p.ssafy.io/runstory/user/" + recomment.simpleUserResDto.profileImgFileName;
                                            return (
                                                <div style={{ marginLeft: "50px", marginBottom: "1%" }}>
                                                    <div style={{ borderRadius: "10px", backgroundColor: "#E1EBFF" }}>
                                                        <div>
                                                            <HStack spacing='24px'>
                                                                <ChevronRightIcon />
                                                                <Avatar
                                                                    isCentered
                                                                    size={'xs'}
                                                                    src={recommenturl}
                                                                    style={{ border: '2px solid #6A6A6A' }} />
                                                                <div style={{ marginLeft: "5%", fontSize: "13px" }}>{recomment.simpleUserResDto.userNickname}</div>
                                                            </HStack>
                                                        </div>
                                                        <div style={{ marginLeft: "30%" }}>
                                                            {recomment.content}
                                                        </div>
                                                        
                                                    </div>
                                                    {/* {recomment.regdate} */}
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </div>
                            )
                        })}
                </div>
                <form margin='0 auto' className='comment-form'
                    onSubmit={(e)=>{handleSubmit(e)}} style={{position: 'fixed', bottom: '60px'}}>
                        <Input className='comment-input' placeholder='댓글을 입력해주세요' type='text' size='xs' width={'80%'}
                        name='comment'
                        value={commentContent}
                        onChange={handleCommentContentChange}
                        ></Input>
                        <Button className='submit-btn' type='submit' margin-left='2%' size='xs'><p>등록</p></Button>
                    </form>
            </div>
            <Footer></Footer>
        </ChakraProvider>
    )
}

export default RunningDetail;
