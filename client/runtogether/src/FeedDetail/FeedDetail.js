import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import {
    Box, Button, Spacer, Divider, Image, useDisclosure,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, Card, CardBody, CardFooter, ModalFooter, Input, Avatar
} from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { useParams, NavLink, Navigate } from 'react-router-dom';
import axios from '../api/axios'
import Hashtags from "./Hashtags";
import BetweenBodyFooter from "../common/BetweenBodyFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // fontawesome 사용
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faBars, faGear, faShare, faHeart, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import axiosH from '../api/axios'
import FeedDetailPageMsg from './FeedDetailPageMsg';

function FeedDetail() {
    const { feedId } = useParams();
    const [feeds, setFeeds] = useState([]);
    const [userId, setUserId] = useState();
    const [hashtags, setHashtags] = useState([]);
    const [feedcomments, setFeedcomments] = useState([]);
    const [user, setUser] = useState([]);
    const [feedfiles, setFeedfiles] = useState([]);
    const [isComment, setIsComment] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [comment, setComment] = useState("");
    const [isLiked, setIsLiked] = useState()
    const [isMypage, setIsMypage] = useState(false);

    useEffect(() => {
        (async () => {
            const url = "feed/detail/" + feedId;
            const data = await axios.get(url)
                .then(function (response) {
                    setFeeds(response.data.data);
                    setHashtags(response.data.data.selectedHashtags)
                    setFeedfiles(response.data.data.feedFiles[0])
                    setFeedcomments(response.data.data.feedComments[0])
                    setUserId(response.data.data.userId)
                    
                    if (response.data.data.feedComments.length === 0) {
                        setIsComment("false")
                    } else {
                        setIsComment("true")
                        setUser(response.data.data.feedComments[0].simpleUserResDto)
                    }
                    if (response.data.data.feedLikeId === null) {
                        setIsLiked(false);
                    }
                    else {
                        setIsLiked(true);
                    }
                })
                .catch(function (error) {
                    console.log("실패");
                })
            })();
        



    }, []);

    useEffect(() => {
        (async () => {
            const data = await axios.get("/user");
            // console.log("본인여부 조회: " + data.data.data.userNickname);
            // console.log("data: " + data.data.data.userSeq);
            // console.log("feeds: " + feeds.userId);
            if (data.data.userSeq == userId) {
                console.log("내피드임");
                setIsMypage(true);
            }
        })();
    }, []);

    if (feeds.profileImgFileName == null) {//기본 프로필인 경우
        var profileurl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    } else {
        var profileurl = "https://i8a806.p.ssafy.io/runstory/user/" + feeds.profileImgFileName;
    }
    var feedurl = "https://i8a806.p.ssafy.io/runstory/feeds/" + feedfiles.filePath;

    async function postLike(feedId) {
        await axiosH({
            url: "/feed/feed-like/" + feedId,
            method: "POST"
        });
        setIsLiked(true)
    }

    async function deleteLike(feedId) {
        await axiosH({
            url: "/feed/feed-unlike/" + feedId,
            method: "DELETE"
        }).then(function (response) {
            console.log("성공");
        })
            .catch(function (error) {
                console.log("실패");
            });
        setIsLiked(false)
    }

    async function deleteFeed(feedId) {
        await axiosH({
            url: "/feed/" + feedId,
            method: "DELETE"
        }).then(function (response) {
            window.location.replace("/feed/"+userId);
        });
    }

    const clickLike = (feedId) => {
        // e.preventDefault();
        var color = document.getElementById(feedId).style.color;
        if (color === 'grey') {
            document.getElementById(feedId).style.color = 'red';
            postLike(feedId);
            // 좋아요 POST
        }
        else {
            document.getElementById(feedId).style.color = 'grey';
            deleteLike(feedId);
            // 좋아요 DELETE
        }
    }

    return (
        <div style={{ marginBottom: "15%" }}>
            <Modal isOpen={isOpen} onClose={onClose} size='xs' isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody style={{ margin: '0 auto', width: '100%', marginTop: '30px' }}>
                        <div style={{ width: '100%' }}>
                            <Divider mt='5px' w='100%' mb='5px' />
                            <button onClick={() => deleteFeed(feedId)} style={{ fontSize: '20px', textAlign: 'center' }}>
                                삭제
                            </button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Header></Header>
            <FeedDetailPageMsg></FeedDetailPageMsg>
            {
                isMypage ?
                    <div style={{ display: 'flex', justifyContent: "right" }}>
                        <div style={{ textAlign: 'right', marginRight: '10%', fontSize: '20px' }}><FontAwesomeIcon onClick={onOpen} icon={faBars} /></div>
                    </div> : null}
            <div style={{ width: "80%", margin: '0 auto', display: 'flex' }}>
                <NavLink to={"/feed/" + feeds.userId}>
                    <Avatar name='author-profile-img' src={profileurl} style={{ border: "1px dotted #6A6A6A", marginRight: '3%' }} />
                </NavLink>
                {/* <img alt="" src={profileurl} width="8%" height="10%"/> */}
                <div style={{ display: 'block', marginLeft: "3px" }}>
                    <div style={{ fontSize: "15px" }}>{feeds.userNickname}</div>
                </div>
            </div>
            {/* </div> */}
            <Divider w={'80%'} m={'0 auto'} orientation='horizontal'></Divider>
            <div style={{ marginTop: '3%' }}>
                <div style={{ width: '100%', margin: '0 auto' }}>
                    {feedurl === null ? "" :
                        <Image
                            border='1px solid #CBD9E7'
                            margin='0 auto'
                            marginTop='10px'
                            width='80%'
                            borderRadius='lg'
                            src={feedurl}
                            alt={feedurl}
                        />
                    }
                </div>
                <div style={{ marginTop: "1%", marginLeft: "10%" }}>
                    {hashtags.map(function (r) {
                        return (<div className="hashtag-selected"># {r.hashtag.hashtagName}</div>)
                    })}
                </div>
            </div>
            <div style={{ width: '80%', marginLeft: "10%" }}>
                {!isLiked ?
                    <div style={{ display: 'flex', height: '40px', justifyContent: 'left' }}>
                        <FontAwesomeIcon className='like' icon={faHeart} id={feeds.feedId} style={{ color: 'grey', fontSize: '20px' }} onClick={() => { clickLike(feeds.feedId) }} />
                        <div style={{ lineHeight: '40px', fontSize: '14px' }}>{feeds.feedLikeCnt}명이 이 피드를 좋아합니다</div>
                    </div>
                    :
                    <div style={{ display: 'flex', height: '40px', justifyContent: 'left' }}>
                        <FontAwesomeIcon className='like' icon={faHeart} id={feeds.feedId} style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }} onClick={() => { clickLike(feeds.feedId) }} />
                        {feeds.feedLikeCnt === 0 ? <div style={{ lineHeight: '40px', fontSize: '14px' }}>내가 이 피드를 좋아합니다</div> :
                            <div style={{ lineHeight: '40px', fontSize: '14px' }}>나 외에 {feeds.feedLikeCnt}명이 이 피드를 좋아합니다</div>}
                    </div>}
            </div>
            <div style={{ width: '80%', marginLeft: "10%" }}>
                <Divider m={'0 auto'} orientation='horizontal'></Divider>
                <div style={{ width: '80%', marginLeft: '10%', marginTop: '3%', marginBottom: '5%', fontSize: '15px' }}>{feeds.content}</div>
                <Divider m={'0 auto'} orientation='horizontal'></Divider>
                <div className="user-nickname" style={{ float: 'right', fontSize: '12px' }}>{feeds.regdate}</div>
                <Divider m={'0 auto'} orientation='horizontal' display={'hidden'}></Divider>
                <NavLink to={"/feed/detail/" + feedId + "/comment"}>
                    <div style={{ marginTop: "5%" }}>💬 댓글 보기</div>
                </NavLink>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default FeedDetail;
