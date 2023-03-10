package com.runstory.service;

import com.runstory.domain.user.dto.FollowDto;
import com.runstory.domain.user.entity.Follow;
import com.runstory.domain.user.entity.User;
import com.runstory.repository.FollowRepository;
import com.runstory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    public Follow findFollowStatus(Long myUserId, Long yourUserId){
        return followRepository.findFollowStatus(myUserId,yourUserId);
    }

    public List<Follow> findFollwing(Long userId){
        return followRepository.findFollowing(userId);
    }

    public List<Follow> findFollwer(Long userId){
        return followRepository.findFollower(userId);
    }

    /**
     * 팔로잉, 팔로워 정보 조회
     * @param userId
     * @return
     */
    public Map<String, List<FollowDto>> findFollowList(Long userId){
        Map<String, List<FollowDto>> result = new HashMap<>();
        List<FollowDto> temp = new ArrayList<>();
        List<Follow> followings = findFollwing(userId);
        List<Follow> followers = findFollwer(userId);

        for (Follow f:followings) {
            FollowDto followDto = new FollowDto(f, f.getTo());
            temp.add(followDto);
        }
        result.put("followings",List.copyOf(temp));
        temp.clear();

        for (Follow f:followers) {
            FollowDto followDto = new FollowDto(f, f.getFrom());
            temp.add(followDto);
        }
        result.put("followers",temp);

        return result;
    }
    @Transactional
    public Follow saveFollow(Long myUserId, Long yourUserId){
        if(findFollowStatus(myUserId,yourUserId)==null) {
            User my = userRepository.findByUserSeq(myUserId);
            User your = userRepository.findByUserSeq(yourUserId);
            Follow follow = new Follow(my, your);
            return followRepository.save(follow);
        }
        else
            return null;
    }

    @Transactional
    public void deleteFollow(Long followId){
        followRepository.deleteById(followId);
    }
}
