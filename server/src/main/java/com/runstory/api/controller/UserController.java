package com.runstory.api.controller;

import com.runstory.api.request.UserFindDto;
import com.runstory.api.request.UserRegisterPostReq;
import com.runstory.api.response.BaseResponse;
import com.runstory.common.auth.CustomUserDetails;
import com.runstory.domain.user.dto.UserDto;
import com.runstory.domain.user.entity.User;
import com.runstory.service.AuthService;
import com.runstory.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;

	@Autowired
	AuthService authService;
	
	@PostMapping(value = "/signup",consumes = {"multipart/form-data"})
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<?> register(
			UserRegisterPostReq registerInfo) throws Exception{ //@ApiParam(value="회원가입 정보", required = true)
		System.out.println("회원가입 : "+registerInfo.getUserId());
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.createUser(registerInfo);
		if(user == null){
			//이미 회원가입 한 회원
			return ResponseEntity.ok(BaseResponse.fail());
		}
		// 프로필 사진 변경
		userService.changeUserImage(true,user.getUserId(),registerInfo.getProfileImg());
		return ResponseEntity.ok(BaseResponse.success(null));
	}

	@GetMapping()
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "사용자 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> getUserInfo(@ApiIgnore Authentication authentication) {
		/*
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
		System.out.println(userDetails);
		String userId = userDetails.getUsername();
		UserDto user = userService.getUserInfoByUserId(userId);

		if(user!= null){
			return ResponseEntity.ok(BaseResponse.success(user));
		}
		//일치한 회원이 없는 경우
		return ResponseEntity.ok(BaseResponse.fail());
	}

	@DeleteMapping()
	@ApiOperation(value = "회원 탈퇴", notes = "해당 회원의 정보를 삭제한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "사용자 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> deleteUser(@ApiIgnore Authentication authentication) {
		/*
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
		String userId = userDetails.getUsername();
		userService.deleteUser(userId);
		return ResponseEntity.ok(BaseResponse.success(null));
	}

	@GetMapping("/nickname/{nickname}")
	@ApiOperation(value = "닉네임 중복 체크", notes = "변경할 닉네임 중복 체크")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "사용자 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> checkNickname(
		@PathVariable String nickname) { //@ApiParam(value="회원가입 정보", required = true)
		System.out.println("닉네임 : "+nickname);
		User user = userService.getUserByUserNickname(nickname);
		if(user == null){
			return ResponseEntity.ok(BaseResponse.success(null));
		}else{
			//중복된 닉네임
			return ResponseEntity.ok(BaseResponse.fail());
		}
	}
	
	@PostMapping("/find/id")
	@ApiOperation(value = "아이디 찾기", notes = "회원 이름과 전화번호를 입력하는 경우 아이디를 반환해준다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<?> findId(@RequestBody UserFindDto userFindDto) {

		User user = userService.findId(userFindDto);
		if(user != null){
			Map<String, Object> result = new HashMap<>();
			result.put("userId", user.getUserId());
			return ResponseEntity.ok(BaseResponse.success(result));
		}
		//일치하지 않는 정보
		return ResponseEntity.ok(BaseResponse.fail());
	}

	@PostMapping("/find/pwd")
	@ApiOperation(value = "비밀번호 찾기", notes = "회원 이름과 아이디를 입력하는 경우 아이디를 반환해준다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "사용자 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> findPwd(@RequestBody UserFindDto userFindDto) {

		User user = userService.findPwd(userFindDto);
		if(user != null){
			// 이메일 인증 코드 전송
			try {
				String id = user.getUserId();
				String confirm = authService.sendSimpleMessage(id);
				userService.changePwd(id,confirm);
				return ResponseEntity.ok(BaseResponse.success(null));
			} catch (Exception e) {
				//BAD REQUEST
				return ResponseEntity.ok(BaseResponse.fail());
			}
		}
		//일치하지 않는 정보
		return ResponseEntity.ok(BaseResponse.fail());
	}
	@PutMapping(consumes = {"multipart/form-data"}) //회원 전체 정보 수정
	public ResponseEntity<?> changeUserInfo(@ApiIgnore Authentication authentication, UserRegisterPostReq userRegisterPostReq)
		throws Exception {
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
		Long userSeq = userDetails.getUserSeq();

		userService.changeUserAllInfo(userSeq,userRegisterPostReq);

		return ResponseEntity.ok(BaseResponse.success(null));
	}
	@PutMapping("/nickname")
	@ApiOperation(value = "닉네임 변경", notes = "회원의 닉네임을 변경 해준다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "사용자 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> changeNickname(@ApiIgnore Authentication authentication, @RequestBody UserRegisterPostReq userRegisterPostReq) {
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
		String userId = userDetails.getUsername();

		userService.changeUserInfo("nickname", userId,userRegisterPostReq.getUserNickname());

		return ResponseEntity.ok(BaseResponse.success(null));
	}

	@PutMapping("/pwd")
	@ApiOperation(value = "비밀번호 변경", notes = "회원의 닉네임 변경")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "사용자 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> changePwd(@ApiIgnore Authentication authentication, @RequestBody UserRegisterPostReq userRegisterPostReq) {
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
		String userId = userDetails.getUsername();
		String newPwd = userRegisterPostReq.getUserPwd();
		userService.changePwd(userId,newPwd);
		return ResponseEntity.ok(BaseResponse.success(null));
	}

	@PutMapping("/address")
	@ApiOperation(value = "주소 변경", notes = "회원의 주소 변경")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "사용자 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> changeAddress(@ApiIgnore Authentication authentication, @RequestBody UserRegisterPostReq userRegisterPostReq) {
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
		String userId = userDetails.getUsername();

		userService.changeUserInfo("address", userId,userRegisterPostReq.getAddress());

		return ResponseEntity.ok(BaseResponse.success(null));
	}

	@PutMapping("/hashtag")
	@ApiOperation(value = "해시태그 변경", notes = "회원의 주소 변경")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "사용자 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> changeHashtags(@ApiIgnore Authentication authentication, @RequestBody UserRegisterPostReq userRegisterPostReq) {
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
		String userId = userDetails.getUsername();
		List<Long> list = userRegisterPostReq.getHashtags();

		userService.changeUserHashtage(userId,list);

		return ResponseEntity.ok(BaseResponse.success(null));
	}
	@PutMapping("/profileimg")
	@ApiOperation(value = "프로필 이미지 변경", notes = "회원의 프로필 이미지 변경")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "사용자 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> changeProfileImg(@ApiIgnore Authentication authentication, @RequestBody MultipartFile image) {
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
		String userId = userDetails.getUsername();
		String newImageName = "";
		try {
			newImageName = userService.changeUserImage(false,userId,image);
		}catch (Exception e){
			System.out.println("에러 : "+e);
		}
		return ResponseEntity.ok(BaseResponse.success(newImageName));
	}

	@GetMapping("/isMe/{userSeq}")
	@ApiOperation(value = "토큰이랑 seq번호 체크", notes = "")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "사용자 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public BaseResponse<?> isMe(@ApiIgnore Authentication authentication, @PathVariable Long userSeq) {
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
		User user = userDetails.getUser();
		if(user.getUserSeq() == userSeq)
			return BaseResponse.success(true);

		return BaseResponse.fail();
	}
}
