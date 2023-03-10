package com.runstory.repository;

import com.runstory.domain.feed.entity.FeedLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FeedLikeRepository extends JpaRepository<FeedLike, Long> {
    @Query("select f from FeedLike f where f.feed.feedId =:feedId and f.user.userSeq =:userId ")
    FeedLike findByFeedIdAndUserId(@Param("feedId") Long feedId, @Param("userId") Long userId);
}
