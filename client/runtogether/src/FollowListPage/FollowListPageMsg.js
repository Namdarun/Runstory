import React from 'react';
import './FollowListPageMsg.css'
import { useNavigate } from 'react-router-dom';

const FollowPageMsg = () => {
    const navigate = useNavigate();
  return (
      <div className="follow-header">
          <div className='follow-header-left' onClick={() => navigate(-1)}>
              <p className='follow-title'>←</p>
          </div>
      </div>
  );
}

export default FollowPageMsg;