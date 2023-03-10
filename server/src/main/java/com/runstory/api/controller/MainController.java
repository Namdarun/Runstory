package com.runstory.api.controller;

import com.runstory.api.response.BaseResponse;
import com.runstory.api.response.FeedResDto;
import com.runstory.api.response.RunningMainResDto;
import com.runstory.common.auth.CustomUserDetails;
import com.runstory.domain.feed.entity.Feed;
import com.runstory.domain.feed.entity.FeedLike;
import com.runstory.service.FeedService;
import com.runstory.service.RunningService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/main")
@RequiredArgsConstructor
@Api(tags = "인덱스 페이지 API")
public class MainController {
    private final FeedService feedService;
    private final RunningService runningService;

    @GetMapping("/running")
    @ApiOperation(value = "상단바 러닝 모임 조회", notes = "")
    public BaseResponse<?> getRunningCrewByToday (@RequestParam float latitude, @RequestParam float longitude){
        List <RunningMainResDto> result = new ArrayList<>();
        List<RunningMainResDto> today = runningService.findByToday();
        if(today!=null) result.addAll(today);

        List<RunningMainResDto> location = runningService.findByLocation(latitude, longitude);
        if(location!=null)  result.addAll(location);
        System.out.println("결과값: "+result.size());
        return BaseResponse.success(result);
    }

    @GetMapping("/user-feed")
    @ApiOperation(value = "나의 팔로잉 피드 사용자 조회", notes = "")
    public BaseResponse getFollowingFeedPages(@ApiIgnore Authentication authentication, @RequestParam("lastfeedid") Long lastFeedId, @RequestParam int size){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        List<FeedResDto> result = feedService.findFeedPagesByFollowing(lastFeedId, size, userDetails.getUserSeq());
        return BaseResponse.success(result);
    }

    @GetMapping("/feed")
    @ApiOperation(value = "비회원 메인 피드 조회", notes = "")
    public BaseResponse getRecentFeedPages(@RequestParam("lastfeedid") Long lastFeedId, @RequestParam int size){
        Page<Feed> feeds = feedService.findFeedPagesByNonMember(lastFeedId, size);
        System.out.println(feeds.getSize());
        List<FeedResDto> result = feeds.stream().map(f -> new FeedResDto(f,null)).collect(Collectors.toList());
        return BaseResponse.success(result);
    }

    @PostMapping("/feed-like/{feedid}")
    @ApiOperation(value = "피드 좋아요 저장", notes = "")
    public BaseResponse saveFeedLike(@ApiIgnore Authentication authentication, @PathVariable("feedid") Long feedId){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        FeedLike feedLike = feedService.saveFeedLiKe(feedId, userDetails.getUserSeq());
        if(feedLike!=null)
            return BaseResponse.success(null);
        else return BaseResponse.fail();
    }

    @DeleteMapping("/feed-unlike/{feedid}")
    @ApiOperation(value = "피드 좋아요 취소", notes = "")
    public BaseResponse deleteFeedLike(@ApiIgnore Authentication authentication, @PathVariable("feedid") Long feedId){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        feedService.deleteFeedLike(feedId,userDetails.getUserSeq());
        return BaseResponse.success(null);
    }
}
