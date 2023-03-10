package com.runstory.service;

import com.runstory.domain.chat.ChatRoom;
import com.runstory.domain.chat.ChatRoomUser;
import com.runstory.domain.chat.dto.ChatListDto;
import com.runstory.domain.chat.dto.ChatRoomDto;
import com.runstory.domain.user.entity.User;
import com.runstory.repository.ChatRoomRepository;
import com.runstory.repository.ChatRoomUserRepository;
import com.runstory.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;
import org.springframework.stereotype.Service;

// 추후 DB 와 연결 시 Service 와 Repository(DAO) 로 분리 예정
//@Repository
@Service
@Slf4j
public class ChatService {
    @Autowired
    ChatRoomRepository chatRoomRepository;
    @Autowired
    ChatRoomUserRepository chatRoomUserRepository;
    @Autowired
    UserRepository userRepository;

    // 전체 채팅방 조회
    public List<ChatRoom> findAllRoom(){
        List<ChatRoom> chatRooms = chatRoomRepository.findAll();
        return chatRooms;
    }

    // roomID 기준으로 채팅방 찾기
    public ChatRoom findRoomById(Long roomId){
        return chatRoomRepository.findByChatRoomId(roomId);
    }

    // roomName 로 채팅방 만들기
    public ChatRoom createChatRoom(User my, User user){

        // 새로운 채팅 방 생성
        ChatRoom chatRoom = new ChatRoom();
        chatRoom = chatRoomRepository.save(chatRoom);

        ChatRoomUser chatRoomUser;
        // 해당 채팅방에 속한 유저 my 추가
        chatRoomUser = new ChatRoomUser();
        chatRoomUser.setChatRoom(chatRoom);
        chatRoomUser.setUser(my);
        chatRoomUserRepository.save(chatRoomUser);

        // 해당 채팅방에 속한 유저 user 추가
        chatRoomUser = new ChatRoomUser();
        chatRoomUser.setChatRoom(chatRoom);
        chatRoomUser.setUser(user);
        chatRoomUserRepository.save(chatRoomUser);

        return chatRoom;
    }

//    // 채팅방 인원+1
//    public void plusUserCnt(String roomId){
//        ChatRoom room = ChatRoom.get(roomId);
//        room.setUserCount(room.getUserCount()+1);
//    }
//
//    // 채팅방 인원-1
//    public void minusUserCnt(String roomId){
//        ChatRoomDto room = chatRoomMap.get(roomId);
//        room.setUserCount(room.getUserCount()-1);
//    }

//    // 채팅방 유저 리스트에 유저 추가
//    public String addUser(String roomId, String userName){
//        ChatRoomDto room = chatRoomMap.get(roomId);
//        String userUUID = UUID.randomUUID().toString();
//
//        // 아이디 중복 확인 후 userList 에 추가
//        room.getUserlist().put(userUUID, userName);
//
//        return userUUID;
//    }

//    // 채팅방 유저 이름 중복 확인
//    public String isDuplicateName(String roomId, String username){
//        ChatRoomDto room = chatRoomMap.get(roomId);
//        String tmp = username;
//
//        // 만약 userName 이 중복이라면 랜덤한 숫자를 붙임
//        // 이때 랜덤한 숫자를 붙였을 때 getUserlist 안에 있는 닉네임이라면 다시 랜덤한 숫자 붙이기!
//        while(room.getUserlist().containsValue(tmp)){
//            int ranNum = (int) (Math.random()*100)+1;
//
//            tmp = username+ranNum;
//        }
//
//        return tmp;
//    }

//    // 채팅방 유저 리스트 삭제
//    public void delUser(String roomId, String userUUID){
//        ChatRoomDto room = chatRoomMap.get(roomId);
//        room.getUserlist().remove(userUUID);
//    }

//    // 채팅방 userName 조회
//    public String getUserName(String roomId, String userUUID){
//        ChatRoomDto room = chatRoomMap.get(roomId);
//        return room.getUserlist().get(userUUID);
//    }

    // 채팅방 전체 userlist 조회
    public ArrayList<User> getUserList(Long roomId){
        ArrayList<User> list = new ArrayList<>();

        ChatRoom room = chatRoomRepository.findByChatRoomId(roomId);

        // hashmap 을 for 문을 돌린 후
        // value 값만 뽑아내서 list 에 저장 후 reutrn
//        room.getUsers().forEach((key, value) -> list.add(value));
        return list;
    }

    // 채팅방 전체 user-chat-list 조회
    public List<ChatListDto> getUserChatRoomList(Long userSeq){

        User user = userRepository.findByUserSeq(userSeq);
//        if(user == null)
//            return null;

        List<ChatRoomUser> list = user.getRooms(); //내가 포함 된 채팅 리스트
        List<ChatRoom> chatRoomList = new ArrayList<>();
        for (ChatRoomUser chatRoomUser : list){
            ChatRoom chatRoom = chatRoomUser.getChatRoom();
            chatRoomList.add(chatRoom);
        }

        List<ChatListDto> result = new ArrayList<>();
        for (ChatRoom chatRoom : chatRoomList){
            List<ChatRoomUser> chatRoomUserList = chatRoomUserRepository.findByChatRoom(chatRoom);
            for (ChatRoomUser chatRoomUser: chatRoomUserList){
                System.out.println("여기입니다.:"+chatRoomUser.getChatRoomUserId());
                User opponent = chatRoomUser.getUser();
                if(opponent.getUserSeq() == userSeq) {
                    System.out.println("범임은 너임?");
                    continue;
                }
                ChatListDto chatListDto = new ChatListDto();
                chatListDto.setRoomId(chatRoom.getChatRoomId());
                chatListDto.setUserSeq(opponent.getUserSeq());
                chatListDto.setUserNickname(opponent.getUserNickname());
                chatListDto.setProfileImgFilePath(opponent.getProfileImgFilePath());
                chatListDto.setProfileImgFileName(opponent.getProfileImgFileName());
                result.add(chatListDto);
            }
        }

        // hashmap 을 for 문을 돌린 후
        // value 값만 뽑아내서 list 에 저장 후 reutrn
//        room.getUsers().forEach((key, value) -> list.add(value));
        return result;
    }
}