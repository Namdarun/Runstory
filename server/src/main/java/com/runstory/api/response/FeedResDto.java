package com.runstory.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runstory.domain.feed.PublicScope;
import com.runstory.domain.feed.dto.FeedCommentDto;
import com.runstory.domain.feed.dto.FeedFileDto;
import com.runstory.domain.feed.entity.Feed;
import com.runstory.domain.feed.entity.FeedLike;
import com.runstory.domain.hashtag.dto.SelectedHashtagDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class FeedResDto {
    private Long feedId;
    private Long userId;
    private String profileImgFilePath;
    private String profileImgFileName;
    private String userNickname;
    private String content;
    private PublicScope publicScope;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime regdate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedate;
    private List<FeedFileDto> feedFiles;
    private Long feedLikeId;
    private int feedLikeCnt;
    private List<FeedCommentDto> feedComments;
    private List<SelectedHashtagDto> selectedHashtags;

    public FeedResDto(Feed feed, FeedLike feedLike) {
        this.feedId = feed.getFeedId();
        this.userId = feed.getUser().getUserSeq();
        this.userNickname = feed.getUser().getUserNickname();
        this.profileImgFilePath = feed.getUser().getProfileImgFilePath();
        this.profileImgFileName = feed.getUser().getProfileImgFileName();
        this.content = feed.getContent();
        this.publicScope = feed.getPublicScope();
        this.regdate = feed.getRegdate();
        this.updatedate = feed.getUpdatedate();
        this.feedFiles = feed.getFeedFiles().stream().map(f-> new FeedFileDto(f)).collect(Collectors.toList());
        this.feedLikeId = feedLike==null?null:feedLike.getFeedLikeId();
        this.feedLikeCnt = (feed.getFeedLikes()==null?0:feed.getFeedLikes().size());
        this.feedComments = feed.getFeedComments().stream().map(c -> new FeedCommentDto(c)).collect(Collectors.toList());
        this.selectedHashtags = feed.getSelectedHashtags().stream().map(h -> new SelectedHashtagDto(h)).collect(Collectors.toList());
    }
}
