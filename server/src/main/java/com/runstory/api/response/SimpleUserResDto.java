package com.runstory.api.response;

import com.runstory.domain.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SimpleUserResDto {
    private Long userId;
    private String userNickname;
    private String profileImgFilePath;
    private String profileImgFileName;

    public SimpleUserResDto(User user){
        this.userId = user.getUserSeq();
        this.userNickname = user.getUserNickname();
        this.profileImgFilePath = user.getProfileImgFilePath();
        this.profileImgFileName = user.getProfileImgFileName();
    }
}
