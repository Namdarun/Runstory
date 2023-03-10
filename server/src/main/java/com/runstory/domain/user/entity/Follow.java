package com.runstory.domain.user.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;
    @Comment("팔로워")
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="from_user_id")
    private User from;
    @Comment("팔로잉")
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="to_user_id")
    private User to;

    public Follow(User from, User to) {
        this.from = from;
        this.to = to;
    }
}
