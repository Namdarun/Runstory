// import React from 'react'
// import {
//   ChakraProvider,
//   Card,
// } from '@chakra-ui/react';
// import './ProfileFollowing.css'
// import axios from '../common/axios';
// import { useNavigate } from "react-router-dom";

// // 내가 팔로워하는 사람들
// const Profilefollowing = (props) => {
//   const navigate = useNavigate();
//   const navigateFollow = () => { 
//       navigate("/feed/follow");
//     };

//   return (
//     <ChakraProvider>
//     <Card onClick={navigateFollow} style={{boxShadow:'none' }} direction={{base:'column'}}>
//       <div>
//       팔로잉
//       </div>
//       {props.following} 명
//     </Card>
//     </ChakraProvider>
//     )
//   }

// export default Profilefollowing;