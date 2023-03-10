import React, {useState, useEffect} from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import {Box, Button, Spacer, Image, Divider, Modal, useDisclosure,
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, Card, CardBody, CardFooter, ModalFooter, Input, position} from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios'
import BooleanRunning from "./BooleanRunning";
import BetweenBodyFooter from "../common/BetweenBodyFooter";
import axiosH from '../api/axios'
import RunningDetailPageMsg from './RunningDetailPageMsg'
import { NavLink } from 'react-router-dom';


function RunningDetail(){
    const {runningId} = useParams();
    const [runnings, setRunnings] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [isMyPost, setIsMyPost] = useState(false);
    const [isModifyMode, setIsModifyMode] = useState(false);
    const [userSeq, setUserSeq] = useState();
    const [date, setDate] = useState();

    useEffect(() => {
        (async () => {
            // console.log("runnings: ", runnings)
            const data = await axiosH.get("/user");
            setUserSeq(data.data.data.userSeq)
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const url = "running/detail/" + runningId;
            const data = await axios.get(url)
                .then(function(response) {
                    setRunnings(response.data.data);
                    setHashtags(response.data.data.selectedHashtags)
                    setComments(response.data.data.runningboardcomments)
                    setDate(response.data.data.endTime.substring(0,10))
                    // console.log(response);
                    // console.log(response.data.data.endTime.substring(0,10))
                    // console.log("성공");
                })
                .catch(function(error) {
                    // console.log("실패");
                })
        })();
    }, []);

    var url = "https://i8a806.p.ssafy.io/runstory/running/" + runnings.imgFileName;
    var reservation = `https://i8a806.p.ssafy.io/api/running/${runningId}/reservations`;
    var dibsurl = `https://i8a806.p.ssafy.io/api/running/${runningId}/dibs`;

    const {isOpen, onOpen, onClose} = useDisclosure();

    function getDistance(lat1, lon1, lat2, lon2) {
        if ((lat1 == lat2) && (lon1 == lon2))
            return 0;

        var radLat1 = Math.PI * lat1 / 180;
        var radLat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radTheta = Math.PI * theta / 180;
        var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
        if (dist > 1)
            dist = 1;

        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515 * 1.609344 * 1000;
        if (dist < 100) dist = Math.round(dist / 10) * 10;
        else dist = Math.round(dist / 100) * 100;

        return dist;
    }

    function Authentication(startLatitude, startLongitude, date) {
        // console.log(date)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    var today = new Date();
                    var year = today.getFullYear();
                    var month = ('0' + (today.getMonth() + 1)).slice(-2);
                    var day = ('0' + today.getDate()).slice(-2);
                    var dateString = year + '-' + month  + '-' + day;
                    if (getDistance(position.coords.latitude, position.coords.longitude, startLatitude, startLongitude) < 2000 && dateString === date){
                        const url = `running/${runningId}/valid`;
                        axios.get(url)
                            .then(function(response) {
                                // console.log("성공");
                                window.location.replace("/running/detail/" + runningId)
                            })
                            .catch(function(error) {
                                // console.log("실패");
                            })
                    }else{
                        // console.log("당신은 밖에 있습니다.")
                    }
                }
            )
        }else{
            // console.log("위치를 찍으시기 바랍니다.")
        }
    }

    function runningDelete(runningId) {
        const runningurl = "/running/detail/" + runningId;
        axios.delete(runningurl)
        .then(function(response) {
            // console.log("성공");
            window.location.replace("/running/my")
        })
        .catch(function(error) {
            // console.log("실패");
        })    
    }

    const handleCommentChange = ({ target: { value } }) => setComment(value); // 댓글 작성 시 내용 설정

    const handleSubmit = (e) => { // 작성 버튼 클릭 시 이벤트 함수
        alert(`작성된 내용: ${comment}`); // 데이터 잘 들어왔는지 확인용!!!
    };
    return (
        <div>
            <Header></Header>
            <RunningDetailPageMsg></RunningDetailPageMsg>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size='xs' className='modal' scrollBehavior='inside' height={'10vh'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader size='xs'>댓글</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody border='2px' borderColor='gray.200'>
                        <div className="comments">
                            {comments.map(function(comment){
                                var url = "https://i8a806.p.ssafy.io/runstory/user/" + comment.profileImgName;
                                return (
                                    <Card direction={{base: 'row'}} width='100%' margin='0 auto' mt='10px'>
                                        <CardBody alignItems='center'>
                                            <div className='card-header-left'>
                                                {console.log(comment)}
                                                {comment.profileImgName===null?
                                                    <Image
                                                        boxSize='30px'
                                                        borderRadius='full'
                                                        objectFit='contain'
                                                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                        alt='no image'
                                                    />
                                                    :
                                                    <Image
                                                        boxSize='30px'
                                                        borderRadius='full'
                                                        objectFit='contain'
                                                        src={url}
                                                        alt='Dan Abramov'
                                                    />
                                                }

                                                <div style={{width: "100px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: "elipsis"}}>{comment.userNickName}</div>
                                            </div>
                                            <div className='comment-content'>{comment.content}</div>
                                        </CardBody>
                                        <CardFooter>
                                            {/* <div className='comment-modify-btn'>수정</div> */}
                                            <div className='comment-delete-btn'>삭제</div>
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
            </Modal>
            <div style={{marginBottom: '3%'}}>
                <div style={{width: "80%", margin: '0 auto'}}>
                    <div className="user-nickname">
                        {runnings.crewName}
                        {
                            runnings.creater ?
                            <button className="cancle-btn" onClick={() => runningDelete(runningId)}> 삭제하기 </button>
                            :
                            <BooleanRunning Something={runnings.runner} truevalue="예약 취소" falsevalue= "예약하기" api={reservation} id = {runningId}/>
                        }
                        <BooleanRunning Something={runnings.dibs} truevalue="찜 취소" falsevalue= "찜하기" api={dibsurl} id = {runningId}/>
                        {runnings.validation
                            ? null
                            : <button className="cancle-btn" onClick={() => Authentication(runnings.startLatitude, runnings.startLongitude, date)}> 인증 </button>
                        }
                    </div>
                    <div style={{fontSize: "12px"}}>written by {runnings.userNickName}</div>
                </div>
            </div>
            <Divider w={'80%'} m={'0 auto'} orientation='horizontal'></Divider>
            <div style={{marginTop: '3%'}}>
                <div style={{width: '100%', margin: '0 auto'}}>
                    {url===null? "":
                        <Image
                            border='1px solid #CBD9E7'
                            margin='0 auto'
                            marginTop='10px'
                            width='80%'
                            borderRadius='lg'
                            src={url}
                            alt={url}
                        />
                    }
                </div>
                <div style={{marginTop:"1%", marginLeft: "10%"}}>
                    { hashtags.map(function(r){
                        return (<div className="hashtag-selected"># {r.hashtag.hashtagName}</div>)
                    })}
                </div>
                <div style={{width: '80%', marginLeft: '10%', marginTop: '3%', marginBottom: '5%', fontSize: '16px'}}>{runnings.runningContent}</div>
                <Divider w={'80%'} m={'0 auto'} orientation='horizontal'></Divider>
                <div style={{width: '80%', marginLeft: "10%", marginTop:"5%"}}>
                    <div style={{fontSize: '14px', marginBottom: "1%"}}>시작 위치: {runnings.startLocation}</div>
                    <div style={{fontSize: '14px', marginBottom: "1%"}}>모집 성별: 남자 {runnings.man} 명 / 여자 {runnings.women} 명 / 성별 무관 {runnings.total} 명</div>
                    <div style={{fontSize: '14px', marginBottom: "5%"}}>시간: {runnings.startTime} - {runnings.endTime}</div>
                </div>
                <Divider w={'80%'} m={'0 auto'} orientation='horizontal'></Divider>
                <NavLink to={"/running/detail/" + runnings.id + "/comment"}>
                    <div style={{ marginTop: "5%", marginLeft: '10%' }}>💬 댓글 보기</div>
                </NavLink>
                <div>
                    {/* {
                    comments.map(function(comment){
                        var url = "https://i8a806.p.ssafy.io/runstory/user/" + comment.profileImgName;
                        return (
                        <div style={{textAlign:"center", background: "grey", height:"150px", marginBottom:"20px", padding:"3%", background: "rgb(192,192,192)", borderRadius:"20px"}}>
                            <div style={{marginBottom:"5%"}}>
                            <HStack spacing='24px'>
                                <img alt="" src={url} width="8%" height="10%"/>
                                <Box w='150px' h='6' bg='teal.500' style={{background: "rgb(192,192,192)" }}> {comment.userNickName}  </Box>
                                <Spacer />
                                <Box w='150px' h='6' bg='teal.500' style={{textAlign:"center", background: "rgb(192,192,192)", paddingLeft: "3%", paddingRight:"3%", borderRadius:"30px"}}> {comment.regdate} </Box>
                            </HStack>
                            </div>
                            <div>
                                <Box w='400px' h='6' bg='teal.500' style={{background: "rgb(192,192,192)"}}> {comment.content} </Box>
                            </div>
                        </div>
                        )
                    })
                } */}
                </div>
            </div>
            <BetweenBodyFooter></BetweenBodyFooter>
            <Footer></Footer>
        </div>
    );
}


export default RunningDetail;
