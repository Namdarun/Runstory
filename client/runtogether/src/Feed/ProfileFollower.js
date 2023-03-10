// import React from 'react'
// import {
//   ChakraProvider,
//   Card,
// } from '@chakra-ui/react';
// import './ProfileFollower.css'
// import axios from '../common/axios';
// import { useNavigate } from "react-router-dom";

// // 나를 팔로워하는 사람들
// const Profilefollower = (props) => {
//   const navigate = useNavigate();
//   const navigateFollow = () => { 
//       navigate("/feed/follow");
//     };


//   // const ProFollower :  
//   return (
//     <ChakraProvider>
//     <Card onClick={navigateFollow} style={{ boxShadow:'none'}} direction={{base:'column'}}>
//       <div>
//       팔로워
//       </div>
//       {props.follower} 명
//     </Card>
//     </ChakraProvider>
//     )
//   }

// export default Profilefollower;