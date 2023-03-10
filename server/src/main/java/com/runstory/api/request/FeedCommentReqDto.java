package com.runstory.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedCommentReqDto {
    private Long id;    //댓글 작성 시 피드 아이디, 대댓글 작성시 댓글 아이디가 된다.
    private String content;
}
