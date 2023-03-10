package com.runstory.domain.running.dto;

import com.runstory.domain.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RunningDibsDto {
    private Long userId;
    private UserDto userDto;
    private RunningDto runningDto;
}
