package com.runstory.api.response;

import com.runstory.domain.user.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserResDto {
	@ApiModelProperty(name="User ID")
	String userId;
	
	public static UserResDto of(User user) {
		UserResDto res = new UserResDto();
		res.setUserId(user.getUserId());
		return res;
	}
}
