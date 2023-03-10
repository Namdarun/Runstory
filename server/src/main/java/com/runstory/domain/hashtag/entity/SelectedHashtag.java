package com.runstory.domain.hashtag.entity;

import com.runstory.domain.feed.entity.Feed;
import com.runstory.domain.hashtag.HashtagType;
import com.runstory.domain.running.Running;
import com.runstory.domain.user.entity.User;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.DynamicInsert;


@Entity
@Data
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SelectedHashtag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long selectedHashtagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hashtag_id")
    @Comment("해시태그 아이디")
    private Hashtag hashtag;
    @Comment("FEED: 피드, USER: 사용자, RUNNING: 러닝")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private HashtagType hashtagType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "running_id")
    @Comment("러닝아이디")
    private Running running;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    @Comment("피드아이디")
    private Feed feed;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @Comment("사용자아이디")
    private User user;

    public SelectedHashtag(Hashtag hashtag, HashtagType hashtagType, Running running, Feed feed, User user) {
        this.hashtag = hashtag;
        this.hashtagType = hashtagType;
        this.running = running;
        this.feed = feed;
        this.user = user;
    }
}
