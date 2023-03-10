import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { Link } from 'react-router-dom';
import './RunningDetailPageMsg.css';
import { useNavigate } from 'react-router-dom';

const FeedDetailPageMsg = () => {
    const navigate = useNavigate();
    return (
        <div className="chatting-room-header">
            <div className='header-left' onClick={() => navigate(-1)}>
                <p className='chatting-title'>←</p>
            </div>
            {/* <div className='header-right'>
                <Link to='/create-running-crew'><div className='post-btn'>채팅방 생성 <FontAwesomeIcon icon={faArrowAltCircleRight} /></div></Link>
            </div> */}
        </div>
    );
}

export default FeedDetailPageMsg;