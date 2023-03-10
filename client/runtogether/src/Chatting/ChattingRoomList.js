import React, {useState, useEffect} from 'react';
import { Image, Card, CardBody, CardHeader} from '@chakra-ui/react';
import './ChattingRoomList.css';
import axios from 'axios';

// import SockJsClient from 'react-stomp';

import ChattingRoom from './ChattingRoom';

const ChattingRoomList = () => {
    const[chatting, setChatting] = useState([]);

    useEffect(async () => {
        const data = await axios.get(
            "https://i8a806.p.ssafy.io/api/chatroom/rooms",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access-token")}`
                }
            }
        )

        // console.log("data : "+JSON.stringify(data.data.data) )
        setChatting(data.data.data);
        
    }, []);

    let defaultImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    let imageBaseUrl = "https://i8a806.p.ssafy.io/runstory/user/";

    return (
        <div className="chatting-list">
            
            {chatting.map((item, idx) => {
                return (
                    <>
                <Card direction={{base: 'row'}} width='90%' ms='5%' mt='10px' display='flex' justifyContent='center' alignItems='center'>
                    <CardHeader>
                        {/* {console.log(item)} */}
                        <Image
                            boxSize='50px'
                            objectFit='cover'
                            src={item.profileImgFileName==null?defaultImg:imageBaseUrl+item.profileImgFileName}
                            alt='Dan Abramov'
                            borderRadius={100}
                        />
                    </CardHeader>
                    <CardBody display='flex' textAlign={'left'} fontWeight={'bold'} style={{overflow: 'auto'}} >
                        <div style={{ width: '120px', textOverflow: 'ellipsis'}}>
                        {item.userNickname}
                        </div>
                    </CardBody>
                    
                    <ChattingRoom yourSeq={item.userSeq} yourNickname={item.userNickname} yourProfileImg={item.profileImgFileName==null?defaultImg:imageBaseUrl+item.profileImgFileName}></ChattingRoom>
                </Card>
                </>)
                })}
        </div>
    );
}

export default ChattingRoomList;