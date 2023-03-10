package com.runstory.service;

import com.runstory.domain.user.dto.UserBlockDto;
import com.runstory.domain.user.entity.User;
import com.runstory.domain.user.entity.UserBlock;
import com.runstory.repository.UserBlockRepository;
import com.runstory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserBlockService {
    private final UserBlockRepository userBlockRepository;
    private final UserRepository userRepository;
    public List<UserBlockDto> findUserBlockList(Long userId){
        List<UserBlock> blockUsers = userBlockRepository.findByUserUserSeq(userId);
        System.out.println("blockUser: "+blockUsers.size());
        List<UserBlockDto> result = blockUsers.stream().map(b->new UserBlockDto(b)).collect(Collectors.toList());
        return result;
    }

    public UserBlock findUserBlock(Long myUserId, Long yourUserId){
        UserBlock userBlock = userBlockRepository.findByUserUserSeqAndBlockedUserSeq(myUserId, yourUserId);
        return userBlock;
    }
    @Transactional
    public UserBlock saveUserBlock(Long myUserId, Long blockUserId){
        User user = userRepository.findByUserSeq(myUserId);
        User blocked = userRepository.findByUserSeq(blockUserId);
        UserBlock userBlock = new UserBlock(blocked, user);
        return userBlockRepository.save(userBlock);
    }

    @Transactional
    public void deleteUserBlock(Long UserBlockId){
        userBlockRepository.deleteById(UserBlockId);
    }
}
