package com.runstory.domain.hashtag.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor
public class Hashtag {
    @Comment("해시태그아이디")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long hashtagId;

    @OneToMany(cascade = CascadeType.ALL, mappedBy ="hashtag")
    private List<SelectedHashtag> selectedHashTags = new ArrayList<>();

    @Column(length = 100, nullable = false)
    @Comment("해시태그명")
    private String hashtagName;





}
