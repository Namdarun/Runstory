package com.runstory.service;

import com.runstory.api.request.UserFindDto;
import com.runstory.api.request.UserRegisterPostReq;
import com.runstory.api.response.SimpleUserResDto;
import com.runstory.common.util.FileUtil;
import com.runstory.domain.chat.ChatRoom;
import com.runstory.domain.chat.ChatRoomUser;
import com.runstory.domain.hashtag.HashtagType;
import com.runstory.domain.hashtag.entity.Hashtag;
import com.runstory.domain.hashtag.entity.SelectedHashtag;
import com.runstory.domain.user.RegType;
import com.runstory.domain.user.dto.UserDto;
import com.runstory.domain.user.entity.User;
import com.runstory.repository.ChatRoomRepository;
import com.runstory.repository.ChatRoomUserRepository;
import com.runstory.repository.HashtagRepository;
import com.runstory.repository.SelectedHashtagRepository;
import com.runstory.repository.UserRepository;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

	@Autowired UserRepository userRepository;
	@Autowired PasswordEncoder passwordEncoder;
	@Autowired HashtagRepository hashtagRepository;
	@Autowired SelectedHashtagRepository selectedHashtagRepository;
	@Autowired ChatRoomRepository chatRoomRepository;
	@Autowired ChatRoomUserRepository chatRoomUserRepository;

	@Override
	@Transactional
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		//이미 회원가입 한 회원인지 체크하기
		User user = userRepository.findByUserId(userRegisterInfo.getUserId());
		if(user != null){
			return null;
		}

		user = new User();
		user.setUserId(userRegisterInfo.getUserId());
		//보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setUserPwd(passwordEncoder.encode(userRegisterInfo.getUserPwd()));
		user.setUserName(userRegisterInfo.getUserName());
		user.setUserNickname(userRegisterInfo.getUserNickname());
		user.setEmailAuth(userRegisterInfo.isEmailAuth());
		user.setPhoneNum(userRegisterInfo.getPhoneNum());
		user.setGender(userRegisterInfo.getGender());
		user.setAddress(userRegisterInfo.getAddress());
		user.setAge(userRegisterInfo.getAge());
		user.setRoleType(userRegisterInfo.getRoleType());
		user.setRegType(userRegisterInfo.getRegType());
		userRepository.save(user);

		if(user.getRegType() == RegType.LOCAL) {
			List<Long> list = userRegisterInfo.getHashtags();
			for (Long hashtagId : list) {
				Hashtag hashtag = hashtagRepository.findHashtagByHashtagId(hashtagId);
				SelectedHashtag selectedHashtag = new SelectedHashtag();

				selectedHashtag.setHashtag(hashtag);
				selectedHashtag.setUser(user);
				selectedHashtag.setHashtagType(HashtagType.valueOf("USER"));
				selectedHashtagRepository.save(selectedHashtag);
			}
		}
		return user;
	}

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepository.findByUserId(userId);
//		User user = userRepositorySupport.findUserByUserId(userId).get();
		return user;
	}

	@Override
	public User getUserProfileByUserSeq(Long userSeq) {
		User user = userRepository.findByUserSeq(userSeq);
		return user;
	}

	@Override
	public UserDto getUserInfoByUserId(String userId) {
		User user = userRepository.findByUserId(userId);
		UserDto userDto = new UserDto(user);
		List<SelectedHashtag> selectedHashtags = selectedHashtagRepository.findAllByUser(user);
		List<Long> hashtags = new ArrayList<>();
		for(SelectedHashtag hashtag : selectedHashtags){
			hashtags.add(hashtag.getHashtag().getHashtagId());
		}
		userDto.setHashtags(hashtags);
		return userDto;
	}

	@Override
	public User getUserByUserNickname(String userNickname) {
		User user = userRepository.findByUserNickname(userNickname);
		return user;
	}

	@Override
	@Transactional
	public boolean isTokenSaved(String userId, String token) {
		User user = userRepository.findByUserId(userId);
		user.setToken(token);
		try {
			userRepository.save(user);
			return true;
		}catch (Exception e){
			return false;
		}
	}

	@Override
	public User findId(UserFindDto userFindDto) {
		User user = userRepository.findByUserName(userFindDto.getUserName());
		if(userFindDto.getPhoneNum().equals(user.getPhoneNum()))
			return user;
		return null;
	}

	@Override
	public User findPwd(UserFindDto userFindDto) {
		User user = userRepository.findByUserId(userFindDto.getUserId());
		if(userFindDto.getUserName().equals(user.getUserName()))
			return user;
		return null;
	}

	@Override
	public void changePwd(String userId, String pwd) {
		//보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		User user = userRepository.findByUserId(userId);
		if(user!=null){
			user.setUserPwd(passwordEncoder.encode(pwd));
			userRepository.save(user);
		}
	}

	@Override
	@Transactional
	public void deleteUser(String userId) {
		//기존 해시태그 삭제
		User user = userRepository.findByUserId(userId);
		selectedHashtagRepository.deleteSelectedHashtagByUserId(user.getUserSeq());

		//채팅방 삭제
		List<ChatRoomUser> list = chatRoomUserRepository.findByUser(user);
		for(ChatRoomUser chatRoomUser : list){
			ChatRoom chatRoom = chatRoomUser.getChatRoom();
			List<ChatRoomUser> chatRoomUsers = chatRoomUserRepository.findByChatRoom(chatRoom);
			for(ChatRoomUser cru : chatRoomUsers){
				System.out.println("삭제 챗룸유저 : "+cru.getChatRoomUserId());
				chatRoomUserRepository.delete(cru);
			}
			System.out.println("삭제 챗방 : "+chatRoom.getChatRoomId());
			chatRoomRepository.deleteById(chatRoom.getChatRoomId());
		}
		//채팅방 유저 삭제
		userRepository.deleteUserByUserId(userId);
	}

	@Override
	@Transactional
	public void changeUserInfo(String type, String userId, String value) {
		User user = userRepository.findByUserId(userId);
		if("nickname".equals(type)){
			//닉네임 중복 체크하는 부분
			User duplicatedUser = userRepository.findByUserNickname(value);
			if(duplicatedUser == null){
				user.setUserNickname(value);
			}else{
				System.out.println("중복됨");
			}
		}else if("address".equals(type)){
			user.setAddress(value);
		}
		userRepository.save(user);
	}

	@Override
	@Transactional
	public String changeUserImage(boolean isRegistered, String userId, MultipartFile image) throws Exception{
		User user = userRepository.findByUserId(userId);
//		System.out.println("사진 변경 :"+user);
		// 수정하는 경우 기존 파일 삭제
//		if (!isRegistered) {
//			File file = new File(user.getProfileImgFilePath());
//			boolean result = file.delete();
//			System.out.println("파일 삭제 결과 : "+result);
//		}
		String hostname = InetAddress.getLocalHost().getHostName();

		FileUtil fileUtil = new FileUtil();
		HashMap<String, String> file = fileUtil.fileCreate(hostname, "user",image);

		// DB 변경
		user.setProfileImgFilePath(file.get("filepath"));
		user.setProfileImgFileName(file.get("filename"));
		userRepository.save(user);
		return file.get("filename");
	}
	@Override
	@Transactional
	public void changeUserHashtage(String userId, List<Long> list) {
		User user = userRepository.findByUserId(userId);

		//기존 해시태그 삭제
		selectedHashtagRepository.deleteSelectedHashtagByUserId(user.getUserSeq());

		// 새로운 해시태그 추가
		for(Long hashtagId : list){
			Hashtag hashtag = hashtagRepository.findHashtagByHashtagId(hashtagId);
			SelectedHashtag selectedHashtag = new SelectedHashtag();

			selectedHashtag.setHashtag(hashtag);
			selectedHashtag.setUser(user);
			selectedHashtag.setHashtagType(HashtagType.valueOf("USER"));
			selectedHashtagRepository.save(selectedHashtag);
		}
	}

	@Override
	public String getToken(String userId) {
		User user = userRepository.findByUserId(userId);
		return user.getToken();
	}

	@Override
	public List<SimpleUserResDto> searchByUserNickname(String userNickname, Long lastUserId, int size) {
		PageRequest pageRequest = PageRequest.of(0, size);
		Page<User> users = userRepository.findByUserNicknameContainsAndUserSeqLessThanOrderByUserSeqDesc(userNickname, lastUserId, pageRequest);
		List<SimpleUserResDto> result = users.stream().map(u->new SimpleUserResDto(u)).collect(Collectors.toList());
		return result;
	}

	@Override
	@Transactional
	public void changeUserAllInfo(Long userSeq, UserRegisterPostReq userRegisterPostReq)
		throws Exception {
		User user = userRepository.findByUserSeq(userSeq);

		//닉네임, 이름, 성별, 나이, 핸드폰 번호, 주소, 해시택
		user.setUserName(userRegisterPostReq.getUserName());
		user.setUserNickname(userRegisterPostReq.getUserNickname());
		user.setGender(userRegisterPostReq.getGender());
		user.setAge(userRegisterPostReq.getAge());
		user.setPhoneNum(userRegisterPostReq.getPhoneNum());
		user.setAddress(userRegisterPostReq.getAddress());

		userRepository.save(user);

		if(userRegisterPostReq.getProfileImg() != null){
			// 프로필 사진 변경
			//String changeUserImage(boolean isRegistered, String userId, MultipartFile image)
			String result = changeUserImage(true, userRegisterPostReq.getUserId(),userRegisterPostReq.getProfileImg());
			System.out.println("프로필 사진 변경 : "+result);
		}

		//기존 해시태그 삭제
		selectedHashtagRepository.deleteSelectedHashtagByUserId(userSeq);

		List<Long> list = userRegisterPostReq.getHashtags();
		if(list != null){
			// 새로운 해시태그 추가
			for(Long hashtagId : list){
				Hashtag hashtag = hashtagRepository.findHashtagByHashtagId(hashtagId);
				SelectedHashtag selectedHashtag = new SelectedHashtag();

				selectedHashtag.setHashtag(hashtag);
				selectedHashtag.setUser(user);
				selectedHashtag.setHashtagType(HashtagType.valueOf("USER"));
				selectedHashtagRepository.save(selectedHashtag);
			}
		}
	}
}
