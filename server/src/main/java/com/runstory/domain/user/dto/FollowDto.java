package com.runstory.domain.user.dto;

import com.runstory.domain.user.entity.Follow;
import com.runstory.domain.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FollowDto {
    private Long followId;
    private Long userId;
    private String userNickname;
    private String profileImgFilePath;
    private String profileImgFileName;

    public FollowDto(Follow follow, User user) {
        this.followId = follow.getFollowId();
        this.userId = user.getUserSeq();
        this.userNickname = user.getUserNickname();
        this.profileImgFilePath = user.getProfileImgFilePath();
        this.profileImgFileName = user.getProfileImgFileName();
    }
}
