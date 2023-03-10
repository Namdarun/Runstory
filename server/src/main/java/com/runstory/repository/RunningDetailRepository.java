package com.runstory.repository;

import com.runstory.domain.running.RunningDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RunningDetailRepository extends JpaRepository<RunningDetail, Long> {
    RunningDetail getById(Long id);
}
