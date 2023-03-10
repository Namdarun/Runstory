import React from 'react';
import './NoticePageMsg.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router-dom';

const NoticePageMsg = () => {
    const navigate = useNavigate();
    return (
        <div className="notice-header">
            <div className='header-left' onClick={() => navigate(-1)}>
                <p className='notice-title'>←</p>
            </div>
        </div>
    );
}

export default NoticePageMsg;