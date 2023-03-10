package com.runstory.repository;

import com.runstory.domain.hashtag.entity.Hashtag;
import com.runstory.domain.hashtag.entity.SelectedHashtag;
import java.util.List;

import com.runstory.domain.running.Running;
import com.runstory.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface SelectedHashtagRepository extends JpaRepository<SelectedHashtag, Long> {
    List<SelectedHashtag> findAll();
    @Modifying
    @Transactional
    @Query("delete from SelectedHashtag i where i.user.userSeq = :userSeq")
    void deleteSelectedHashtagByUserId(@Param("userSeq") Long userSeq);

    @Modifying
    @Query("delete from SelectedHashtag s where s.feed.feedId = :feedId")
    void deleteSelectedHashtagByFeedId(@Param("feedId")Long feedId);

    @Query("select s from SelectedHashtag s where s.feed.feedId = :feedId order by s.hashtag.hashtagId asc ")
    List<SelectedHashtag> findByFeedIdOrderByHashtagIdAsc(@Param("feedId")Long feedId);

    List<SelectedHashtag> findByHashtag_HashtagIdAndFeedNotNull(@Param("hashtagId") Long hashtagId);

    List<SelectedHashtag> findAllByRunning(Running running);

    List<SelectedHashtag> findAllByUser(User user);

    List<SelectedHashtag> findAllByHashtag(Hashtag hashtag);

}
