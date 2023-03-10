package com.runstory.repository;

import com.runstory.domain.user.entity.UserBlock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserBlockRepository extends JpaRepository<UserBlock, Long> {
    List<UserBlock> findByUserUserSeq(Long userId);
    UserBlock findByUserUserSeqAndBlockedUserSeq(Long myUserId, Long yourUserId);
}
