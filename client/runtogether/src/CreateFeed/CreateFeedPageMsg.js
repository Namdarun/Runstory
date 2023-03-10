import React from 'react';
import './CreateFeedPageMsg.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";

const CreateFeedPageMsg = () => {
    return (
        <div className="create-feed-header">
            <div className='header-left'>
                <p className='create-feed-title'>피드 등록</p>
            </div>
            {/* <div className='header-right'>
                <div className='post-btn'>크루 만들러 가기 <FontAwesomeIcon icon={faArrowAltCircleRight} /></div>
            </div> */}
        </div>
    );
}

export default CreateFeedPageMsg;