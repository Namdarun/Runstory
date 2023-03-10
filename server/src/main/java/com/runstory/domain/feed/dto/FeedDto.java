package com.runstory.domain.feed.dto;

import com.runstory.domain.feed.entity.Feed;
import com.runstory.domain.feed.PublicScope;
import com.runstory.domain.user.dto.UserDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class FeedDto {
    private Long feedId;
    private UserDto user;
    private String content;
    private List<FeedFileDto> feedFiles;
    private PublicScope publicScope;
    private LocalDateTime regdate;
    private LocalDateTime updatedate;

    public FeedDto(Feed feed){
        this.feedId=feed.getFeedId();
        this.user=new UserDto(feed.getUser());
        this.content=feed.getContent();
        this.feedFiles= feed.getFeedFiles().stream().map(f->new FeedFileDto(f)).collect(Collectors.toList());
        this.publicScope=feed.getPublicScope();
        this.regdate=feed.getRegdate();
        this.updatedate=feed.getUpdatedate();
    }
}
