import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import './Login.css'
import {Divider,
    ChakraProvider,
  } from '@chakra-ui/react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import  {useNavigate} from 'react-router-dom'; 


const FINDPWD_URL = 'https://i8a806.p.ssafy.io/api/user/find/pwd';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [userName, setUserName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [userId, setUserId] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const Navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [userName, phoneNum, userId])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch(login(userData));
        // 서버에 데이터직렬화를 통해 post 요청 보냄
        try {
            const response = await axios.post(FINDPWD_URL,
                JSON.stringify({ userName, phoneNum, userId }),
                {headers: { 'Content-Type': 'application/json' }});
                // console.log(response);
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('에러');
                } else if (err.response?.status === 400) {
                    setErrMsg('가 잘못되어있습니다.');
                } else if (err.response?.status === 401) {
                    setErrMsg('인증되지 않은 사용자');
                } else {
                    setErrMsg('로그인 실패');
                }
                errRef.current.focus();
            }
    }
    
    return (
        <ChakraProvider>
        <Header></Header>
            {success ? (
                window.location.replace('/main')
            ) : (
                <section className='LoginSection' style={{width : '90%'}}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 style={{textAlign:'center'}}>비밀번호 찾기</h1>
                    <form className='LoginForm' onSubmit={handleSubmit}>
                        <label htmlFor="username">이름</label>
                        <input
                            className='LoginInput'
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            required
                            />
                        <Divider style={{margin: '5px'}}/>
                        <label htmlFor="phonenum">전화번호</label>
                        <input
                            className='LoginInput'
                            type="text"
                            id="phonenum"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setPhoneNum(e.target.value)}
                            value={phoneNum}
                            required
                            />
                        <Divider style={{margin: '5px'}}/>
                        <label htmlFor="userid">아이디</label>
                        <input
                            className='LoginInput'
                            type="text"
                            id="userid"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUserId(e.target.value)}
                            value={userId}
                            required
                            />
                        <Divider style={{margin: '3px'}}/>
                        <button>인증 이메일 보내기</button>
                    </form> 
                    <p>
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/user/login">로그인</a>
                        </span>
                    </p>
                </section>
            )}
            <Footer></Footer>
            </ChakraProvider>
    )
}

export default Login;