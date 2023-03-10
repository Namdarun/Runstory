package com.runstory.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MessageDetailDto {
    Long userSeq;
    String message;
    String time;
}
