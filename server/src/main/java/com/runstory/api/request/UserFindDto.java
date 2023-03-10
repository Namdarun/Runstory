package com.runstory.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 아이디 찾기 API 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserFindIdRequest")
public class UserFindDto {
    @ApiModelProperty(name="유저 이름", example="김런닝")
    String userName;
    @ApiModelProperty(name="유저 전화번호", example="01012345678")
    String phoneNum;
    @ApiModelProperty(name="유저 이메일", example="runStory@gmail.com")
    String userId;
}
