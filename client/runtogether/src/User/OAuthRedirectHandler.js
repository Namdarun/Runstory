import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../common/axios';
import Signup from './Signup'
const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  getUser();
  async function getUser(){
    try {
      var code = new URL(window.location.href).searchParams.get("code");
      // console.log(code);
      const response = await axios({url: `/auth/login/kakao?code=${code}`, method: "GET"});
      const ACCESS_TOKEN = response.data.data.accessToken;
      localStorage.setItem("access-token", ACCESS_TOKEN);
      navigate("/main");
    } catch (error) {
      console.error(error);
    } 
  }
};

export default OAuth2RedirectHandler;
