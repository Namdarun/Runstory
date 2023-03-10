package com.runstory.domain.chat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@Setter
@DynamicInsert
public class ChatRoom {
    @Id @Comment("채팅방 아이디")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long chatRoomId;

    @Comment("채팅방 내 유저")
    @OneToMany(mappedBy = "user")
    private List<ChatRoomUser> users = new ArrayList<>();

    @Comment("채팅방 관련 메시지")
    @OneToMany(mappedBy = "chatRoom")
    private List<ChatMessage> messages = new ArrayList<>();

    @Comment("등록 시간")
    @Column(columnDefinition = "datetime DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime regdate;
}
