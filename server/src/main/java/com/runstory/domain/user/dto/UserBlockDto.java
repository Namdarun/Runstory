package com.runstory.domain.user.dto;

import com.runstory.api.response.SimpleUserResDto;
import com.runstory.domain.user.entity.UserBlock;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserBlockDto {
    private Long blockId;
    private SimpleUserResDto blocked;
    public UserBlockDto(UserBlock block){
        this.blockId = block.getBlockId();
        this.blocked = new SimpleUserResDto(block.getBlocked());

    }
}
