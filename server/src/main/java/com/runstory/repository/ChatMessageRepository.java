package com.runstory.repository;

import com.runstory.domain.chat.ChatMessage;
import com.runstory.domain.chat.dto.ChatMessageDto;
import org.springframework.data.repository.CrudRepository;

public interface ChatMessageRepository extends CrudRepository<ChatMessageDto,Long> {
}
