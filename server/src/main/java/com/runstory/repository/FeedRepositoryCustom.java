package com.runstory.repository;

import com.runstory.domain.feed.entity.Feed;

import java.util.List;

public interface FeedRepositoryCustom {
    List<Feed> searchByUserId(Long userId, Boolean isfollow);
}
