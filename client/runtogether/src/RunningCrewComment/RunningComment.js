import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Avatar, Box, Button, ChakraProvider, Spacer, Input } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { NavLink, useParams } from 'react-router-dom';
import axios from '../api/axios'
import { ChevronRightIcon } from '@chakra-ui/icons';
import RunningCrewCommentPageMsg from './RunningCrewCommentPageMsg'
function RunningDetail() {
    const { runningId } = useParams();
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");

    
    const handleCommentContentChange = ({ target: { value } }) => setCommentContent(value); // 댓글 작성 시 내용 설정

    useEffect(() => {
        (async () => {
            const url = "running/detail/" + runningId;
            const data = await axios.get(url)
                .then(function (response) {
                    setComments(response.data.data.runningboardcomments);
                    // console.log(response.data.data.runningboardcomments)
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
        await axios.post("/running/"+runningId+"/comment", {id: runningId, content: commentContent});
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

    return (
        <ChakraProvider>
            <Header></Header>
            <RunningCrewCommentPageMsg></RunningCrewCommentPageMsg>
            <div>
                <div style={{ borderBottom: "5%", maxHeight: '77vh', overflow: 'scroll'}}>
                    {
                        comments.map(function (r) {
                            var url = "https://i8a806.p.ssafy.io/runstory/user/" + r.profileImgFileName;
                            return (
                                <div style={{ paddingLeft: "3%", paddingRight: "3%", borderRadius: "30px", marginBottom: "5%" }}>
                                    <div style={{ borderRadius: "10px", backgroundColor: "#E1EBFF" }}>
                                        <div style={{ borderRadius: "10px", backgroundColor: "#E1EBFF" }}>
                                            <a href={"/feed/" + r.userId}>
                                                <HStack spacing='24px'>
                                                    <Avatar
                                                        isCentered
                                                        size={'xs'}
                                                        src={url}
                                                        style={{ border: '2px solid #6A6A6A' }} />
                                                    <div style={{ marginLeft: "5%", marginTop: "0px", fontSize: "13px" }}>{r.userNickName}</div>
                                                </HStack>
                                            </a>
                                        </div>
                                        <div style={{ paddingLeft: "10%" }}>
                                            {r.content}
                                        </div>
                                    </div>
                                    <hr style={{ margin: "10px" }} />
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
