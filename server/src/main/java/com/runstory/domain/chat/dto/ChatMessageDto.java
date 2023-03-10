package com.runstory.domain.chat.dto;

import java.util.List;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("ChatMessage")
@Getter
public class ChatMessageDto {
    @Id
    private Long chatRoomId;
    private List<MessageDetailDto> message;
//    private LocalDateTime regdate;


    public ChatMessageDto(Long chatRoomId, List<MessageDetailDto> message){
        this.chatRoomId = chatRoomId;
        this.message = message;
    }

}
