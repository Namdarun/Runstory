package com.runstory.repository;

import com.runstory.domain.user.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    @Query("select f from Follow f where (f.from.userSeq = :myUserId and f.to.userSeq = :yourUserId)")
    public Follow findFollowStatus(@Param("myUserId") Long myUserId,@Param("yourUserId") Long yourUserId);

    @Query("select f from Follow f where f.from.userSeq = :userId")
    public List<Follow> findFollowing(@Param("userId") Long userId);

    @Query("select f from Follow f where f.to.userSeq = :userId")
    public List<Follow> findFollower(@Param("userId") Long userId);
}
