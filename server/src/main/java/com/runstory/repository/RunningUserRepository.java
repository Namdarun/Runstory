package com.runstory.repository;

import com.runstory.domain.running.Running;
import com.runstory.domain.running.RunningUser;
import com.runstory.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RunningUserRepository extends JpaRepository<RunningUser, Long> {
    List<RunningUser> findAllByRunning(Running running);
    RunningUser findByRunningAndUser(Running running, User user);
    List<RunningUser> findAllByUser(User user);
}
