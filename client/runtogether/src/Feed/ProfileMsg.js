import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import './ProfileMsg.css'

const ProfileMsg = () => {
  return (
    <div className="profile-header">
      {/* <div className='profile-header-left'> */}
        {/* <p className='profile-title'>남기성님의 페이지</p> */}
      {/* </div> */}
      <div className='profileintro-header-right'>
        <Link to='/setting-intro'>
          <div><FontAwesomeIcon icon={faBars} /></div>
        </Link>
      </div>
    </div>
  );
}

export default ProfileMsg;
