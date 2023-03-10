package com.runstory.domain.chat.dto;

import com.runstory.domain.user.entity.User;
import lombok.Data;

@Data
public class ChatListDto {
    private Long roomId; // 채팅방 아이디
    private Long userSeq;
    private String userNickname;
    private String profileImgFilePath;
    private String profileImgFileName;
}