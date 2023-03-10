import React from 'react';
import {
    Image, Card, CardBody, CardFooter, CardHeader
  } from '@chakra-ui/react';
import './NoticeList.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";

const NoticeList = () => {
    const notices = [
        {
            author: 'tang_tang',
            profileImg: 'https://w.namu.la/s/40cc83425a4a01e5438c620e76e401e3a633852d65e19254fc99a840c013674ec1565de5b0426fc4c83402b4ef9e3a3dcf963ee0d69684de9305c7c9504d10ffcdc88bfe22624226d9a85b2976abed1f19b59aadee927a4c369d41825ebcf2ad',
            content: '님이 팔로우하셨습니다.'
        },
        {
            author: 'tang_tang',
            profileImg: 'https://w.namu.la/s/40cc83425a4a01e5438c620e76e401e3a633852d65e19254fc99a840c013674ec1565de5b0426fc4c83402b4ef9e3a3dcf963ee0d69684de9305c7c9504d10ffcdc88bfe22624226d9a85b2976abed1f19b59aadee927a4c369d41825ebcf2ad',
            content: '님이 좋아요를 누르셨습니다.'
        },
        {
            author: 'songheew',
            profileImg: 'https://bit.ly/dan-abramov',
            content: '님이 댓글을 달았습니다.'
        },
        {
            author: 'doyeon__shin',
            profileImg: 'https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a',
            content: '님이 팔로우하셨습니다.'
        },
    ]
    const [arr] = React.useState(notices)
    return (
        <div className="notice-list">
            {arr.map((item, idx) => {
                return (
                    <>
            <Card direction={{base: 'row'}} width='90%' ms='5%' mt='10px' display='flex' justifyContent='center' alignItems='center'>
                    <CardHeader>
                        <Image
                            boxSize='50px'
                            objectFit='cover'
                            src={item.profileImg}
                            alt='Dan Abramov'
                            borderRadius={100}
                        />
                    </CardHeader>
                    <CardBody display='flex' textAlign={'left'} fontWeight={'bold'}>
                        {item.author} {item.content}
                    </CardBody>
                    <CardFooter>
                        <div className='remove-btn'>
                            <p className='remove'>삭제</p>
                        </div>
                    </CardFooter>
                </Card>
                </>)
                })}
        </div>
    );
}

export default NoticeList;