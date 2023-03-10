package com.runstory.service;

import com.runstory.api.request.UserFindDto;
import com.runstory.api.request.UserRegisterPostReq;
import com.runstory.api.response.SimpleUserResDto;
import com.runstory.domain.user.dto.UserDto;
import com.runstory.domain.user.entity.User;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
	User getUserProfileByUserSeq(Long userSeq);
	UserDto getUserInfoByUserId(String userId);
	User getUserByUserNickname(String userId);
	boolean isTokenSaved(String userId, String token);
	User findId(UserFindDto userFindDto);
	User findPwd(UserFindDto userFindDto);
	void changePwd(String userId, String pwd);
	void deleteUser(String userId);
	void changeUserInfo(String type, String userId,String value);
	String changeUserImage(boolean isRegistered, String userId, MultipartFile image) throws Exception;
	@Transactional
	void changeUserHashtage(String userId, List<Long> list);
	String getToken(String userId);
	List<SimpleUserResDto> searchByUserNickname(String userNickname, Long lastUserId, int size);

	void changeUserAllInfo(Long userSeq, UserRegisterPostReq userRegisterPostReq) throws Exception;
}
