import React from 'react';
import axios from '../common/axios';
import { useNavigate } from "react-router-dom";
import './DeleteProfileButton.css'
import { Button } from '@chakra-ui/react';

const DeleteProfileButton = () => {
  const navigate = useNavigate();
  const handleDeleteProfile = (e) => {
    e.preventDefault();
    if (window.confirm('확인을 누르면 회원 정보가 삭제됩니다.')) {
      axios.delete(axios.baseURL,
        {
          headers: {
          Authorization: 'authorizationToken' + localStorage.getItem('ACCESS_TOKEN'),
          },
        }
        ).then(() => {
        localStorage.clear();
        navigate('/main');
      })
      .catch((err) => alert(err.response.data.message));
    } else {
    return;
  }
  return ( 
    <>
    <Button className='deleteprofilebutton' style={{width:'100%'}} onClick={DeleteProfileButton}>
      회원탈퇴
    </Button>
    </>
    )
};
}

export default DeleteProfileButton;