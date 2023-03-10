package com.runstory.domain.feed.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runstory.api.response.SimpleUserResDto;
import com.runstory.domain.feed.entity.FeedRecomment;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class FeedRecommentDto {
    private Long feedCommentId;
    private Long feedId;
    private SimpleUserResDto simpleUserResDto;
    private String content;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime regdate;

    public FeedRecommentDto(FeedRecomment feedReComment) {
        this.feedCommentId = feedReComment.getFeedRecommnetId();
        this.feedId = feedReComment.getFeedRecommnetId();
        this.simpleUserResDto = new SimpleUserResDto(feedReComment.getUser());
        this.content = feedReComment.getCotent();
        this.regdate = feedReComment.getRegdate();
    }
}
