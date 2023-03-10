package com.runstory.repository;

import com.runstory.domain.running.Running;
import com.runstory.domain.running.RunningDibs;
import com.runstory.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RunningDibsRepository extends JpaRepository<RunningDibs,Long> {
    List<RunningDibs> findAllByRunning(Running running);
    List<RunningDibs> findAllByUser(User user);
    RunningDibs findByRunningAndUser(Running running, User user);
}
