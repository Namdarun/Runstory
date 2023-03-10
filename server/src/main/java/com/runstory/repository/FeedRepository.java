package com.runstory.repository;

import com.runstory.domain.feed.PublicScope;
import com.runstory.domain.feed.entity.Feed;
import com.runstory.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {
    Feed findByFeedId(Long feedId);
    Feed findByFeedIdAndUserUserSeq(Long feedId, Long userId);
    @Query("select f from Feed f where f.user.userSeq= :userId")
    List<Feed> findByUserId(@Param("userId") Long userId);
    Page<Feed> findByFeedIdLessThanAndPublicScopeNotInAndUserInOrderByFeedIdDesc(Long lastFeedId, List<PublicScope> p,List<User> followers, PageRequest pageRequest);
    Page<Feed> findByFeedIdLessThanAndPublicScopeInOrderByFeedIdDesc(Long lastFeedId, List<PublicScope> p,PageRequest pageRequest);
    Page<Feed> findByFeedIdLessThanAndFeedIdInAndPublicScopeInOrderByFeedIdDesc
            (Long lastFeedId, List<Long> feedId,List<PublicScope> p,PageRequest pageRequest);
}