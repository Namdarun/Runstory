package com.runstory.api.controller;

import com.runstory.domain.chat.dto.ChatDto;
import com.runstory.domain.chat.dto.ChatDto.MessageType;
import com.runstory.domain.chat.dto.ChatMessageDto;
import com.runstory.domain.chat.dto.MessageDetailDto;
import com.runstory.domain.user.entity.User;
import com.runstory.repository.ChatMessageRepository;
import com.runstory.repository.ChatRoomRepository;
import com.runstory.repository.ChatRoomUserRepository;
import com.runstory.repository.UserRepository;
import com.runstory.service.ChatService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatController {

    private final SimpMessageSendingOperations template;

    @Autowired
    UserRepository userRepository;
    @Autowired
    ChatService chatService;
    @Autowired
    ChatMessageRepository chatMessageRepository;
    @Autowired
    ChatRoomUserRepository chatRoomUserRepository;
    @Autowired
    ChatRoomRepository chatRoomRepository;

    // MessageMapping 을 통해 webSocket 로 들어오는 메시지를 발신 처리한다.
    // 이때 클라이언트에서는 /pub/chat/message 로 요청하게 되고 이것을 controller 가 받아서 처리한다.
    // 처리가 완료되면 /sub/chat/room/roomId 로 메시지가 전송된다.
    @MessageMapping("/enterUser")
    public void enterUser(@Payload ChatDto chat) {
        Optional<ChatMessageDto> chatRoomList = chatMessageRepository.findById(chat.getRoomId());

        if(!chatRoomList.isPresent()){
//            List<MessageDetailDto> messageDetailDtoList = new ArrayList<>();
//            ChatMessageDto chatMessageDto = new ChatMessageDto(chat.getRoomId(),messageDetailDtoList);
//            chat.setMessage("채팅방이 생성됐습니다.");
//            template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);
//            MessageDetailDto messageDetailDto = new MessageDetailDto(chat.getUserSeq(),chat.getMessage(),chat.getTime());
//            messageDetailDtoList.add(messageDetailDto);
//            chatMessageRepository.save(chatMessageDto);
        }else{
            List<MessageDetailDto> messageDetailDtoList = chatRoomList.get().getMessage();
            for (MessageDetailDto message : messageDetailDtoList){
                System.out.println(message.getMessage());
                System.out.println("user seq : "+message.getUserSeq());

                User user = userRepository.findByUserSeq(message.getUserSeq());

                ChatDto newChat = new ChatDto(MessageType.TALK,chat.getRoomId(),message.getUserSeq(),user.getUserNickname(),message.getMessage(),message.getTime());
                template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), newChat);
            }

        }
    }

    // 해당 유저
    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload ChatDto chat) {

        MessageDetailDto messageDetailDto = new MessageDetailDto(chat.getUserSeq(),chat.getMessage(),chat.getTime());

        Optional<ChatMessageDto> chatRoomList = chatMessageRepository.findById(chat.getRoomId());
        if(!chatRoomList.isPresent()){
            List<MessageDetailDto> messageDetailDtoList = new ArrayList<>();
            messageDetailDtoList.add(messageDetailDto);
            ChatMessageDto chatMessageDto = new ChatMessageDto(chat.getRoomId(),messageDetailDtoList);
            chatMessageRepository.save(chatMessageDto);
        }else{
            ChatMessageDto prevChatMessage = chatRoomList.get();
            List<MessageDetailDto> messageDetailDtoList = prevChatMessage.getMessage();
            messageDetailDtoList.add(messageDetailDto);
            chatMessageRepository.save(prevChatMessage);
        }
        chat.setMessage(chat.getMessage());
        template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);

    }

//    @EventListener
//    void handleSessionConnectedEvent(SessionConnectedEvent event) {
//        // Get Accessor
////        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
////        String sessionId = sha.getUser().getName();
//
//
//        String username = event.getUser().getName();
//        // builder 어노테이션 활용
//        ChatDto chat = ChatDto.builder()
//            .type(ChatDto.MessageType.ENTER)
//            .sender(username)
//            .message(username + " 님 입장!!")
//            .build();
//
//        template.convertAndSend("/"
//            + ""
//            + "sub/chat/room/" + 1, chat);
//    }

//    // 유저 퇴장 시에는 EventListener 을 통해서 유저 퇴장을 확인
//    @EventListener
//    public void webSocketDisconnectListener(SessionDisconnectEvent event) {
//        log.info("DisConnEvent {}", event);
//
//        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//
//        // stomp 세션에 있던 uuid 와 roomId 를 확인해서 채팅방 유저 리스트와 room 에서 해당 유저를 삭제
//        String userUUID = (String) headerAccessor.getSessionAttributes().get("userUUID");
//        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
//
//        log.info("headAccessor {}", headerAccessor);
//
////        // 채팅방 유저 -1
////        chatService.minusUserCnt(roomId);
////
////        // 채팅방 유저 리스트에서 UUID 유저 닉네임 조회 및 리스트에서 유저 삭제
////        String username = chatService.getUserName(roomId, userUUID);
////        chatService.delUser(roomId, userUUID);
//
//        String username = null;
//
//        if (username != null) {
//            log.info("User Disconnected : " + username);
//
//            // builder 어노테이션 활용
//            ChatDto chat = ChatDto.builder()
//                .type(ChatDto.MessageType.LEAVE)
//                .sender(username)
//                .message(username + " 님 퇴장!!")
//                .build();
//
//            template.convertAndSend("/sub/chat/room/" + roomId, chat);
//        }
//    }

//    // 채팅에 참여한 유저 리스트 반환
//    @GetMapping("/userlist")
//    @ResponseBody
//    public ArrayList<String> userList(String roomId) {
//
//        return chatService.getUserList(roomId);
//    }
//
//    // 채팅에 참여한 유저 닉네임 중복 확인
//    @GetMapping("/duplicateName")
//    @ResponseBody
//    public String isDuplicateName(@RequestParam("roomId") String roomId, @RequestParam("username") String username) {
//
//        // 유저 이름 확인
//        String userName = chatService.isDuplicateName(roomId, username);
//        log.info("동작확인 {}", userName);
//
//        return userName;
//    }
}