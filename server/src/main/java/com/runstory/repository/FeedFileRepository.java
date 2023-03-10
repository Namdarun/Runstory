package com.runstory.repository;

import com.runstory.domain.feed.entity.FeedFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedFileRepository extends JpaRepository<FeedFile, Long> {
    @Query("select f from FeedFile f where f.feed.feedId = :feedId")
    List<FeedFile> findByFeedId(@Param("feedId") Long feedId);
}
