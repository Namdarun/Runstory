import React from 'react';
import {Image} from '@chakra-ui/react';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=0cff5728182aa5eebe52ef3c23e4c210&redirect_uri=https://i8a806.p.ssafy.io/oauth/callback/kakao&response_type=code`;

const KakaoLogin = () => {
  // console.log("kakao login");
  return (
    <div>
      <a id="custom-login-btn" href={KAKAO_AUTH_URL}>
        <Image
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          style={{width : '50%' , margin: '0 auto'}}
        />  
      </a>
    </div>
  );
};

export default KakaoLogin;