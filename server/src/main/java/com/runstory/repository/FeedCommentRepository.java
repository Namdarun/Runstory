package com.runstory.repository;

import com.runstory.domain.feed.entity.FeedComment;
import com.runstory.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedCommentRepository extends JpaRepository<FeedComment,Long> {
    FeedComment findByFeedCommentId(Long id);
    FeedComment findByFeedCommentIdAndUser(Long id, User user);
}
