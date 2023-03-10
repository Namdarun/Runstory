import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ImageBox,
  Image,
  Button,
  Link,
} from '@chakra-ui/react';
import ImageBox from "../../atoms/ImageBox/ImageBox";
import { LoginedUserContext } from "../../../contexts/LoginedUserContext";
import { followUser } from "../../../common/FollowUser";
import { unfollowUser } from "../../../common/UnfollowUser";

// 나를 팔로잉했으면 리스트에 들어가야 하고, 
// 내가 상대방 계정에 대해 팔로우 혹은 팔로우해제를 버튼클릭으로 할 수 있어야 한다. 

function UserFollow({ userProfile }) {
  const { user } = useContext(LoginedUserContext);
  const [isFollowing, setFollowing] = useState(userProfile.isfollow);

  async function handleSetFollow() {
    let result;
    if (isFollowing) {
      result = await unfollowUser(user.token, userProfile.accountname);
    } else {
      result = await followUser(user.token, userProfile.accountname);
    }
    setFollowing(result.profile.isfollow);
  }

  const navigate = useNavigate();



  return (
    <div className={styles["wrapper-follow"]}>
      <ImageBox
        src={userProfile.image}
        type="circle"
        size="medium"
        alt="프로필 이미지"
      />
      <Link
        to={`/profile/${userProfile.accountname}`}
        className={styles["wrapper-link"]}
      >
      </Link>
      {user.accountname !== userProfile.accountname && (
        <Button
          size="small"
          label={isFollowing ? "취소" : "팔로우"}
          active={true}
          primary={isFollowing ? false : true}
          onClick={handleSetFollow}
        />
      )}
    </div>
  );
}

export default UserFollow;
