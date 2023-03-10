package com.runstory.domain.hashtag.dto;

import com.runstory.domain.hashtag.entity.Hashtag;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HashtagDto {
    private Long hashtagId;
    private String hashtagName;
    public HashtagDto(Hashtag hashtag){
        this.hashtagId = hashtag.getHashtagId();
        this.hashtagName = hashtag.getHashtagName();
    }
}