package com.runstory.domain.user.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
public class UserBlock {
    @Comment("차단 아이디")
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blockId;

    @Comment("차단당하는 사용자 아이디")
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="blocked_user_id")
    private User blocked;
    @Comment("차단하는 사용자 아이디")
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="user_id")
    private User user;

    public UserBlock(User blocked, User user) {
        this.blocked = blocked;
        this.user = user;
    }
}
