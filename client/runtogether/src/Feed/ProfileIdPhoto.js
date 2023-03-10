// import React, { useState, useRef,useEffect } from 'react';
// import { Card, IconButton, Avatar } from '@chakra-ui/react';
// import { SmallAddIcon } from '@chakra-ui/icons'
// import './ProfileIdPhoto.css';
// import axios from 'axios';

// // 본인의 이미지 버튼 수정 ->
// // 여기서 구현하고 마이페이지로 넘길 것
// // 원래는 본인의 상태
// // 이미지를 변경하는 버튼 구현  
// // 버튼 클릭하면 이미지들 볼 수 있고,
// // 입력하면 프로필에 이미지 등록

// function ProfileIdPhoto(props) {
//   const [selectedImage, setSelectedImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
//   const fileInput = useRef(null)

//   useEffect(() => {
//     (async () => {
//       setSelectedImage("https://i8a806.p.ssafy.io/runstory/user/"+(props.photo.photoName));
//     })();
//   }, [props]);

//   const onChange = async (e) => {
//     if (e.target.files[0]) {
//       setSelectedImage(e.target.files[0])
//       const data = await axios.put('http://i8a806.p.ssafy.io/api/user/profileimg',{image: e.target.files[0],},{
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${localStorage.getItem("access-token")}`
//         },
//       })
//       console.log(data)

//     } else { //업로드 취소할 시
//       setSelectedImage(selectedImage)
//       return
//     }
//     //화면에 프로필 사진 표시
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setSelectedImage(reader.result)
//       }
//     }
//     reader.readAsDataURL(e.target.files[0])
//   }

//   return (
//     <>
//       <Avatar
//         className='profile-img profile-img-wrap profile-img-upload'
//         src={selectedImage}
//         style={{ margin: '20px', width: '100px', height: '100px' }}
//         onClick={() => { props.isMypage && fileInput.current.click() }} />
//       <input
//         type='file'
//         style={{ display: 'none' }}
//         accept='image/jpg,impge/png,image/jpeg'
//         name='profile_img'
//         onChange={onChange}
//         ref={fileInput} />
//       {/* <div className="img-wrap img-upload">
//         {selectedImage && (
//           <img src={Imagefile} ref={fileInput}/>)} 
//         </div> */}
//     </>
//   );
// };

// export default ProfileIdPhoto;


