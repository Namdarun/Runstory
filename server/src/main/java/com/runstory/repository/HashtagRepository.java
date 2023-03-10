package com.runstory.repository;

import com.runstory.domain.hashtag.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    List<Hashtag> findAll();
    Hashtag findHashtagByHashtagId(Long hashtagId);
    Hashtag findHashtagByHashtagName(String hashtagName);
}
