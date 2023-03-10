package com.runstory.domain.feed.entity;

import java.time.LocalDateTime;
import javax.persistence.*;

import com.runstory.domain.user.entity.User;
import lombok.*;
import org.hibernate.annotations.Comment;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedRecomment {

    @Comment("피드 대댓글 아이디")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedRecommnetId;
    @Comment("피드 댓글 아이디")
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="feed_comment_id")
    private FeedComment feedComment;
    @Comment("사용자 아이디")
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="user_id")
    private User user;
    @Comment("댓글 내용")
    @Column(length = 500)
    private String cotent;
    @Comment("등록일자")
    @Column(columnDefinition = "datetime DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime regdate;

    @PrePersist
    public void prePersist(){
        this.regdate=LocalDateTime.now();
    }
}
