package com.runstory.domain.user.entity;

import com.runstory.api.request.RunningCrewReqDto;
import com.runstory.domain.chat.ChatRoomUser;
import com.runstory.domain.feed.entity.Feed;
import com.runstory.domain.feed.entity.FeedComment;
import com.runstory.domain.feed.entity.FeedLike;
import com.runstory.domain.feed.entity.FeedRecomment;
import com.runstory.domain.running.Running;
import com.runstory.domain.running.RunningDibs;
import com.runstory.domain.running.RunningUser;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

import com.runstory.domain.user.RegType;
import com.runstory.domain.user.RoleType;
import lombok.Data;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.DynamicInsert;
import java.time.LocalDateTime;

@Entity
@Data
@DynamicInsert
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq;
    @Column(length = 50, unique=true, nullable = false)
    @Comment("사용자아이디")
    private String userId;
    @Comment("비밀번호")
    @Column(length = 1000, nullable = false) //암호화하면 글자수가 길어짐
    private String userPwd;
    @Comment("이름")
    @Column(length = 30, nullable = false)
    private  String userName;
    @Comment("별명")
    @Column(length = 100, nullable = false)
    private String userNickname;
    @Comment("이메일인증여부(TRUE: 이메일인증성공, FALSE: 이메일인증실패)")
    @Column(columnDefinition = "boolean default false", nullable = false)
    private Boolean emailAuth;

    @Comment("전화번호")
    @Column(length = 50)
    private String phoneNum;
    @Comment("성별(1: 남자, 2:여자)")
    @Column
    private int gender;
    @Comment("주소")
    @Column(length = 200)
    private String address;
    @Comment("나이")
    @Column
    private int age;

    @Comment("토큰")
    @Column(length = 300)
    private String token;

    @Comment("역할(USER: 일반사용자, ADMIN: 관리자)")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleType roleType;
    @Comment("레벨")
    @Column(columnDefinition = "int default 1")
    private int level;
    @Comment("발걸음수(레벨이 상승하면 경험치 0으로 리셋)")
    @Column(columnDefinition = "int default 0")
    private int experience;
    @Comment("프로필이미지경로")
    @Column(length = 500)//, nullable = false)
    private String profileImgFilePath;
    @Comment("프로필이미지파일명")
    @Column(length = 500)//, nullable = false)
    private String profileImgFileName;
    @Comment("LOCAL: 일반회원가입, KAKAO: 카카오, GOOGLE: 구글, NAVER: 네이버")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RegType regType;
    @Comment("회원가입일자")
    @Column(columnDefinition = "datetime DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime regdate;
    @Comment("회원정보수정일자")
    @Column(columnDefinition = "datetime DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updatedate;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<RunningUser> runningusers = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<ChatRoomUser> rooms = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private  List<Feed> feeds = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<Running> runnings = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<RunningDibs> runningDibs = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "from")
    private List<Follow> followings = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "to")
    private List<Follow> followers = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "blocked")
    private List<UserBlock> userBlocked = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<UserBlock> userBlocks = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<FeedComment> feedComments = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<FeedRecomment> feedReComments = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<FeedLike> feedLikes = new ArrayList<>();
    public void UserExperienceUpdate(int level,int distance){
        this.level = level;
        this.experience = distance;
    }
}