import React from 'react';
import './RunningCrewListPageMsg.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { Link } from 'react-router-dom';

const RunningCrewPageMsg = () => {
    return (
        <div className="running-crew-header">
            <div className='header-left'>
                <p className='running-crew-title'>러닝 크루 살펴보기</p>
            </div>
            <div className='header-right'>
            <Link to='/running/my'><div className='my-btn'>나의 크루 <FontAwesomeIcon icon={faArrowAltCircleRight} /></div></Link>
            </div>
            <div className='header-right'>
                <Link to='/create-running-crew'><div className='post-btn'>크루 만들러 가기 <FontAwesomeIcon icon={faArrowAltCircleRight} /></div></Link>
            </div>
        </div>
    );
}

export default RunningCrewPageMsg;