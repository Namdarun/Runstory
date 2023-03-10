package com.runstory.repository;

import com.runstory.domain.chat.ChatRoom;
import com.runstory.domain.chat.ChatRoomUser;
import com.runstory.domain.user.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomUserRepository extends JpaRepository<ChatRoomUser, Long> {
    List<ChatRoomUser> findByUser(User user);
    List<ChatRoomUser> findByChatRoom(ChatRoom chatRoom);
}
