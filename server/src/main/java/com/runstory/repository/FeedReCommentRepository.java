package com.runstory.repository;

import com.runstory.domain.feed.entity.FeedRecomment;
import com.runstory.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedReCommentRepository extends JpaRepository<FeedRecomment,Long> {

    FeedRecomment findByFeedRecommnetIdAndUser(Long recommentId, User user);
}
