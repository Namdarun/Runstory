package com.runstory.api.response;

import com.runstory.domain.user.dto.KakaoUser;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class KakaoSignupInfo {
    public KakaoSignupInfo(KakaoUser kakaoUser){
        this.id = kakaoUser.getId();
        this.nickname = kakaoUser.getProperties().getNickname();
        this.profile_image = kakaoUser.getProperties().getProfile_image();
        this.gender = kakaoUser.getKakao_account().getGender();
    }
    Long id;
    String nickname;
    String profile_image;
    String gender;
}
