package com.runstory.domain.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor
public class KakaoUser {

    private Long id;
    private String connected_at;
    private String has_gender;
    private Properties properties;
    private Kakao_account kakao_account;

    @Getter
    public class Properties{
        private String nickname;
        private String profile_image;
        private String thumbnail_image;
    }

    @Getter
    public class Kakao_account{
        private String profile_nickname_needs_agreement;
        private String profile_image_needs_agreement;
        private String has_gender;
        private String gender_needs_agreement;
        private String gender;
        private Profile profile;
        private String email;
        @Getter
        public class Profile{
            private String nickname;
            private String thumbnail_image_url;
            private String profile_image_url;
            private String is_default_image;
        }
    }
}
