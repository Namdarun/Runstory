import React,{useState} from 'react';
import {
  Card,
  Image,
  CardBody, 
  CardFooter, 
  CardHeader
} from '@chakra-ui/react';
import "./FollowerList.css"
import {NavLink} from "react-router-dom";

// 나를 팔로우하고 있는 사람의 리스트 
// UserFollower, UserFollwing의 모임

const FollowerList= ({followerList}) => {
  
  const followers = followerList;
  const basePath = "https://i8a806.p.ssafy.io/runstory/user/";
  // console.log(followers)

  return (
    <div className='followers-list'>
      {followers.map((item, idx) => {
        console.log("item : "+item);
        return (
        <>
        <Card direction={{base: 'row'}} width='90%' ms='5%' mt='10px' display='flex'alignItems='center'>

                <a href={"/feed/" + item.userId} width='100%'> 
                <CardHeader float={'left'}>
                    <Image
                        boxSize='50px'
                        objectFit='cover'
                        src={item.profileImgFileName==null?"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png":basePath+item.profileImgFileName}
                        alt='Dan Abramov'
                        borderRadius={100}
                    />
                </CardHeader>
                <CardBody display='flex' float={'left'} textAlign={'left'} fontWeight={'bold'} height={'100%'}>
                    {item.userNickname}
                </CardBody>
                {/* <CardFooter>
                    <div className='follower-remove-btn'>
                        <p className='remove'>팔로우 해제</p>
                    </div>
                </CardFooter> */}
                </a>
            </Card>
        </>)
            })}
    </div>
  );
}

export default FollowerList;

