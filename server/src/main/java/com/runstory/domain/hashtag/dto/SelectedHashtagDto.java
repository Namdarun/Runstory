package com.runstory.domain.hashtag.dto;

import com.runstory.domain.hashtag.HashtagType;
import com.runstory.domain.hashtag.entity.SelectedHashtag;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SelectedHashtagDto {
    private Long selectedHashtagId;
    private HashtagDto hashtag;
    private HashtagType hashtagType;
    private Long runningId;
    private Long feedId;
    private Long userId;

    public SelectedHashtagDto(SelectedHashtag selectedHashtag) {
        this.selectedHashtagId = selectedHashtag.getSelectedHashtagId();
        this.hashtag = new HashtagDto(selectedHashtag.getHashtag());
        this.hashtagType = selectedHashtag.getHashtagType();
        this.runningId = selectedHashtag.getRunning()==null?null:selectedHashtag.getRunning().getRunningId();
        this.feedId = selectedHashtag.getFeed()==null?null:selectedHashtag.getFeed().getFeedId();
        this.userId = selectedHashtag.getUser()==null?null:selectedHashtag.getUser().getUserSeq();
    }
}