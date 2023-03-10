package com.runstory.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.runstory.api.request.UserLoginPostReqDto;
import com.runstory.api.request.UserRegisterPostReq;
import com.runstory.api.response.BaseResponse;
import com.runstory.api.response.UserLoginPostResDto;
import com.runstory.common.auth.CustomUserDetails;
import com.runstory.common.model.response.BaseResponseBody;
import com.runstory.common.util.JwtTokenUtil;
import com.runstory.domain.user.RegType;
import com.runstory.domain.user.RoleType;
import com.runstory.domain.user.dto.KakaoUser;
import com.runstory.domain.user.dto.OAuthToken;
import com.runstory.domain.user.entity.User;
import com.runstory.service.AuthService;
import com.runstory.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authService;
    @Autowired
    UserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = UserLoginPostResDto.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponse> login(
        @RequestBody @ApiParam(value = "로그인 정보", required = true) UserLoginPostReqDto loginInfo) {
        String userId = loginInfo.getId();
        String password = loginInfo.getPassword();

        // 비밀번호 길이 50자 확인
        if(password.length() >= 50){
            // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
            return ResponseEntity.status(401)
                .body(BaseResponse.fail());
        }

        User user = userService.getUserByUserId(userId);
        if(user == null){
            // 존재하지 않는 사용자인 경우
            return ResponseEntity.status(404)
                .body(BaseResponse.fail());
        }

        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (passwordEncoder.matches(password, user.getUserPwd())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)

            String accessToken = JwtTokenUtil.getAccessToken((userId));
            String refreshToken = JwtTokenUtil.getRefreshToken((userId));

            System.out.println("Access Token : "+accessToken);
            System.out.println("Refresh Token : "+refreshToken);
            //refreshToken DB에 저장
            boolean isSaved = userService.isTokenSaved(userId,refreshToken);
            if(!isSaved){
                return ResponseEntity.ok(BaseResponse.fail());
//                return ResponseEntity.ok(UserLoginPostResDto.of(500, "토큰 저장 실패", null,null));
            }
            Map<String, Object> result = new HashMap<>();
            result.put("accessToken", accessToken);
            result.put("refreshToken", refreshToken);
            return ResponseEntity.ok(BaseResponse.success(result));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return ResponseEntity.ok(BaseResponse.fail());
//        return ResponseEntity.status(401)
//            .body(UserLoginPostResDto.of(401, "Invalid Password", null,null));
    }

    @PostMapping ("/refresh")
    @ApiOperation(value = "Access-Token 재발급", notes = "<strong>RefreshToken</strong>를 통해 AccessToken을 재 발급 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = UserLoginPostResDto.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponse> refreshToken(@ApiIgnore Authentication authentication,@RequestHeader String Authorization) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();

        String dbToken = userService.getToken(userId);
        String token = Authorization.substring(7);

        if(dbToken.equals(token)){
            System.out.println("DB RefreshToken값과 같다.");
        }else{
            System.out.println("DB RefreshToken값과 다르다.");
            return ResponseEntity.ok(BaseResponse.fail());
        }

        String newAccessToken = JwtTokenUtil.getAccessToken(userId);
        System.out.println("Access Token : "+newAccessToken);

        Map<String, Object> result = new HashMap<>();
        result.put("accessToken", newAccessToken);
        return ResponseEntity.ok(BaseResponse.success(result));
    }

    @GetMapping("/login/kakao/token")
    @ApiOperation(value = "회원가입된 카카오 로그인 사용자인지 체크, 안했으면 토큰을 던져줘 카카오 로그인 연결 끊기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostResDto.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<?> kakaoLoginCheck(@RequestParam String code, @Value("${restApiKey}") String key, @Value("${redirectUrl}") String url) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", key);
        params.add("redirect_uri", url);
        params.add("code", code);
        params.add("client_secret", "");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        RestTemplate rt = new RestTemplate();

        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token", //{요청할 서버 주소}
                HttpMethod.POST, //{요청할 방식}
                request, // {요청할 때 보낼 데이터}
                String.class //{요청시 반환되는 데이터 타입}
        );
        ObjectMapper objectMapper = new ObjectMapper();
        OAuthToken oauthToken = null;
        //Model과 다르게 되있으면 그리고 getter setter가 없으면 오류가 날 것이다.
        try {
            oauthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        //카카오 로그인 연결을 끊기 위한 토큰
        String token = oauthToken.getAccess_token();
        System.out.println("토큰 : "+token);

        // 추가 개인 정보 얻기
        headers.set("Authorization", "Bearer " + oauthToken.getAccess_token());
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        params = new LinkedMultiValueMap<>();

        request = new HttpEntity<>(params, headers);

        rt = new RestTemplate();

        response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me", //{요청할 서버 주소}
                HttpMethod.POST, //{요청할 방식}
                request, // {요청할 때 보낼 데이터}
                String.class //{요청시 반환되는 데이터 타입}
        );

        System.out.println("마지막 결과 : "+response);

        objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        KakaoUser kakaoUser = null;
        //Model과 다르게 되있으면 그리고 getter setter가 없으면 오류가 날 것이다.
        try {
            kakaoUser = objectMapper.readValue(response.getBody(), KakaoUser.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        Long id = kakaoUser.getId();
        System.out.println("결과 : "+id);
        String userId = id+"";
        User user = userService.getUserByUserId(userId);
        HashMap<String, Object> userInfo = new HashMap<>();

        //회원가입을 안한 카카오 로그인 사용자->연결을 끊어줘야함
        if(user==null) {
            userInfo.put("user", false);
            userInfo.put("token", token);
            return ResponseEntity.ok(BaseResponse.success(userInfo));
        }
        userInfo.put("user", true);
        userInfo.put("token",token);
        return ResponseEntity.ok(BaseResponse.success(userInfo));
    }

    @GetMapping("/login/kakao")
    @ApiOperation(value = "카카오 로그인", notes = "<strong>카카오 로그인</strong>을 통해 로그인 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = UserLoginPostResDto.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<?> kakaoLogin(@RequestParam String code, @Value("${restApiKey}") String key, @Value("${redirectUrl}") String url) {
        System.out.println("code : "+code);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", key);
        params.add("redirect_uri", url);
        params.add("code", code);
        params.add("client_secret", "");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        RestTemplate rt = new RestTemplate();

        ResponseEntity<String> response = rt.exchange(
            "https://kauth.kakao.com/oauth/token", //{요청할 서버 주소}
            HttpMethod.POST, //{요청할 방식}
            request, // {요청할 때 보낼 데이터}
            String.class //{요청시 반환되는 데이터 타입}
        );

        System.out.println("결과 : "+response.getBody());

        ObjectMapper objectMapper = new ObjectMapper();
        OAuthToken oauthToken = null;
        //Model과 다르게 되있으면 그리고 getter setter가 없으면 오류가 날 것이다.
        try {
            oauthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        //카카오 로그인 연결을 끊기 위한 토큰
        String token = oauthToken.getAccess_token();
        System.out.println("토큰 : "+token);

        // 추가 개인 정보 얻기
        headers.set("Authorization", "Bearer " + oauthToken.getAccess_token());
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        params = new LinkedMultiValueMap<>();

        request = new HttpEntity<>(params, headers);

        rt = new RestTemplate();

        response = rt.exchange(
            "https://kapi.kakao.com/v2/user/me", //{요청할 서버 주소}
            HttpMethod.POST, //{요청할 방식}
            request, // {요청할 때 보낼 데이터}
            String.class //{요청시 반환되는 데이터 타입}
        );

        System.out.println("마지막 결과 : "+response);

        objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        KakaoUser kakaoUser = null;
        //Model과 다르게 되있으면 그리고 getter setter가 없으면 오류가 날 것이다.
        try {
            kakaoUser = objectMapper.readValue(response.getBody(), KakaoUser.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        Long id = kakaoUser.getId();
        System.out.println("결과 : "+id);
        String userId = id+"";
        User user = userService.getUserByUserId(userId);
      
        if(user==null) {
            //회원가입
            UserRegisterPostReq req = new UserRegisterPostReq();
            req.setUserId(kakaoUser.getId()+"");
            req.setUserPwd(passwordEncoder.encode("0000"));
            req.setUserName(kakaoUser.getProperties().getNickname());
            req.setUserNickname(kakaoUser.getKakao_account().getEmail());
            req.setEmailAuth(true);
            req.setGender(kakaoUser.getKakao_account().getGender()=="male"?1:2);
            req.setRoleType(RoleType.USER);
            req.setRegType(RegType.KAKAO);
            User newUser = userService.createUser(req);
        }
        //로그인 시 사용하는 토큰
        String accessToken = JwtTokenUtil.getAccessToken(userId);
        String refreshToken = JwtTokenUtil.getRefreshToken(userId);

        System.out.println("Access Token : "+accessToken);
        System.out.println("Refresh Token : "+refreshToken);

        //refreshToken DB에 저장
        boolean isSaved = userService.isTokenSaved(userId,refreshToken);
        if(!isSaved){
//            return ResponseEntity.ok(UserLoginPostResDto.of(500, "토큰 저장 실패", null,null));
            return ResponseEntity.ok(BaseResponse.fail());
        }
        Map<String, Object> result = new HashMap<>();
        result.put("accessToken", accessToken);
        result.put("refreshToken", refreshToken);
        return ResponseEntity.ok(BaseResponse.success(result));
    }

    @PostMapping("/logout")
    @ApiOperation(value = "로그아웃", notes = "<strong>아이디와 패스워드</strong>를 통해 로그아웃 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = UserLoginPostResDto.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserLoginPostResDto> logout(){
        return null;
    }

    @GetMapping("/email")
    @ApiOperation(value = "이메일 인증 코드 전송", notes = "<strong>제공 받은 이메일에</strong> 인증 코드를 전송한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = BaseResponse.class),
//        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "중복된 이메일", response = BaseResponse.class),
        @ApiResponse(code = 500, message = "이메일 전송 실패", response = BaseResponse.class)
    })
    public ResponseEntity<?> emailSend(
        @ApiParam(value = "이메일 정보", required = true) @RequestParam String userEmail) {
        //이메일 중복 체크
        User user = userService.getUserByUserId(userEmail);
        if(user != null)
            return ResponseEntity.ok(BaseResponse.fail());
//            return ResponseEntity.ok(BaseResponseBody.of(404, "중복된 이메일"));

        // 이메일 인증 코드 전송
        try {
            String confirm = authService.sendSimpleMessage(userEmail);
            Map<String, Object> result = new HashMap<>();
            result.put("authenticationCode", confirm);
            return ResponseEntity.ok(BaseResponse.success(result));
        } catch (Exception e) {
            return ResponseEntity.ok(BaseResponse.fail());
//            return ResponseEntity.ok(BaseResponseBody.of(500, "BAD REQUEST"));
        }
    }
}
