package com.runstory.domain.qa;


import com.runstory.domain.user.entity.User;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@DynamicInsert
public class QA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    @Comment("질문아이디")
    private long qaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",
        foreignKey = @ForeignKey(name = "fk_qna_to_user_id"))
    @Comment("유저아이디")
    private User user;
    @Column(length = 50, nullable = false)
    @Comment("질문이름")
    private String qaTitle;
    @Column(length = 1000, nullable = false)
    @Comment("질문내용")
    private String qaContent;
    @Column(columnDefinition = "boolean default FALSE", nullable = false)
    @Comment("응답유무")
    private Boolean qaReply;
    @Column(length = 1000, nullable = false)
    @Comment("응답내용")
    private String qaReplyContent;
    @Column(columnDefinition = "datetime DEFAULT CURRENT_TIMESTAMP", nullable = false)
    @Comment("질문날짜(지금)")
    private LocalDateTime qaRegdate;
    @Column(columnDefinition = "datetime DEFAULT CURRENT_TIMESTAMP", nullable = false)
    @Comment("응답날짜")
    private LocalDateTime replyDate;


}

