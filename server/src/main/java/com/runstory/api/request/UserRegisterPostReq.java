package com.runstory.api.request;

import com.runstory.common.model.response.BaseResponseBody;
import com.runstory.domain.user.RegType;
import com.runstory.domain.user.RoleType;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
//@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq extends BaseResponseBody {
//	@ApiModelProperty(name="유저 ID", example="ssafy_web")
	String userId;
//	@ApiModelProperty(name="유저 Password", example="your_password")
	String userPwd;

	String userName;
	String userNickname;
	boolean emailAuth;
	String phoneNum;
	int gender;
	String address;
	int age;
	RoleType roleType;
	RegType regType;
	String profileImgFilePath;
	String profileImgFileName;
	List<Long> hashtags;
	MultipartFile profileImg;
}
