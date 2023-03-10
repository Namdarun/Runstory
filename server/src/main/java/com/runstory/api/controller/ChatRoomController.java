package com.runstory.api.controller;

import com.fasterxml.jackson.databind.ser.Serializers.Base;
import com.runstory.api.response.BaseResponse;
import com.runstory.common.auth.CustomUserDetails;
import com.runstory.domain.chat.ChatRoom;
import com.runstory.domain.chat.ChatRoomUser;
import com.runstory.domain.chat.dto.ChatListDto;
import com.runstory.domain.user.entity.User;
import com.runstory.repository.ChatRoomRepository;
import com.runstory.repository.ChatRoomUserRepository;
import com.runstory.repository.UserRepository;
import com.runstory.service.ChatService;
import java.util.HashSet;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@RestController
@RequestMapping("/chatroom")
public class ChatRoomController {

    // ChatRepository Bean 가져오기
    @Autowired
    private ChatService chatService;
    @Autowired
    ChatRoomRepository chatRoomRepository;
    @Autowired
    ChatRoomUserRepository chatRoomUserRepository;
    @Autowired
    UserRepository userRepository;

    // 채팅 리스트 화면
    // / 로 요청이 들어오면 전체 채팅룸 리스트를 담아서 return
    @GetMapping("")
    public BaseResponse<?> goChatRoom(){

        List<ChatRoom> list = chatService.findAllRoom();
        log.info("SHOW ALL " + " {}",list);
            return BaseResponse.success(list);
    }

    // 채팅방 생성
    // 채팅방 생성 후 다시 / 로 return
    @GetMapping("/createroom/{userId}")
    public BaseResponse<?> createRoom(@ApiIgnore Authentication authentication, @PathVariable Long userId) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long myId = userDetails.getUserSeq();
        // 이미 만든 채팅방이 있는지 확인
        User my = userRepository.findByUserSeq(myId);
        User user = userRepository.findByUserSeq(userId);

        if(user == null){
            return BaseResponse.fail();
        }

        HashSet<Long> set = new HashSet<>();
        List<ChatRoomUser> myChattingList = chatRoomUserRepository.findByUser(my);
        for (ChatRoomUser room : myChattingList){
            set.add(room.getChatRoom().getChatRoomId());
        }
        myChattingList = chatRoomUserRepository.findByUser(user);
        for (ChatRoomUser room : myChattingList){
            if(set.contains(room.getChatRoom().getChatRoomId())){
                // 이미 채팅방이 존재하는 경우
                return BaseResponse.customSuccess(404,"이미 존재하는 방입니다.",room.getChatRoom().getChatRoomId());
            }
        }

        ChatRoom room = chatService.createChatRoom(my,user);
        log.info("CREATE Chat Room {}", room);
        return BaseResponse.success(room.getChatRoomId());
    }

    // 채팅방 입장 화면
    // 파라미터로 넘어오는 roomId 를 확인후 해당 roomId 를 기준으로
    // 채팅방을 찾아서 클라이언트를 chatroom 으로 보낸다.
    @GetMapping("/rooms")
    public BaseResponse<?> roomList(@ApiIgnore Authentication authentication){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long userSeq = userDetails.getUserSeq();

        List<ChatListDto> list =  chatService.getUserChatRoomList(userSeq);

        return BaseResponse.success(list);
    }

}