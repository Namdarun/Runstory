package com.runstory.repository;

import com.runstory.domain.running.RunningBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RunningCommentRepository extends JpaRepository<RunningBoardComment, Long> {

}
