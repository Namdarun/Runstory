package com.runstory.api.controller;

import com.runstory.api.request.FeedCommentReqDto;
import com.runstory.api.request.FeedReqDto;
import com.runstory.api.response.BaseResponse;
import com.runstory.api.response.FeedResDto;
import com.runstory.api.response.SimpleFeedResDto;
import com.runstory.common.auth.CustomUserDetails;
import com.runstory.domain.feed.dto.FeedCommentDto;
import com.runstory.domain.feed.dto.FeedDto;
import com.runstory.domain.feed.entity.Feed;
import com.runstory.domain.feed.entity.FeedLike;
import com.runstory.domain.hashtag.dto.HashtagDto;
import com.runstory.domain.user.dto.FollowDto;
import com.runstory.domain.user.dto.UserBlockDto;
import com.runstory.domain.user.entity.Follow;
import com.runstory.domain.user.entity.User;
import com.runstory.domain.user.entity.UserBlock;
import com.runstory.service.FeedService;
import com.runstory.service.FollowService;
import com.runstory.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;
import com.runstory.service.UserBlockService;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/feed")
@RequiredArgsConstructor
@Api(tags = "개인 피드 API")
public class FeedController {
    private final FeedService feedService;
    private final FollowService followService;
    private final UserService userService;
    private final UserBlockService userBlockService;

//    @GetMapping("")
    public  ResponseEntity<List<SimpleFeedResDto>> getFeedAll(){
        List<FeedDto> feeds = feedService.findAll();
        List<SimpleFeedResDto> result = feeds.stream().map(f->new SimpleFeedResDto(f)).collect(Collectors.toList());
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/{userid}")
    @ApiOperation(value = "사용자 피드 조회", notes = "공개 범위에 따라 피드 조회")
    public BaseResponse<?> getUserFeed(@ApiIgnore Authentication authentication, @PathVariable("userid") Long userId){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Boolean isMe = (userId==userDetails.getUserSeq());
        List<FeedDto> feedDtos = feedService.findByUserId(userDetails.getUserSeq(), userId, isMe);
        List<SimpleFeedResDto> result= feedDtos.stream().map(f->new SimpleFeedResDto(f)).collect(Collectors.toList());

        return BaseResponse.success(result);
    }

    @GetMapping("/followstatus/{userid}")
    @ApiOperation(value = "사용자 팔로우 조회", notes = "팔로우 상태, 팔로잉, 팔로워 수 조회")
    public BaseResponse<?> getFollowStatus(@ApiIgnore Authentication authentication, @PathVariable("userid") Long userId){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        Long myId = userDetails.getUserSeq();
        HashMap<String, Object> result = new HashMap<>();
        Follow follow = followService.findFollowStatus(myId,userId);
        int follwingCnt = followService.findFollwing(userId).size();
        int follwerCnt = followService.findFollwer(userId).size();
        result.put("followStatus", follow==null?false:true);    //팔로우 상태에 따라 팔로우, 언팔로우 버튼 동작
        result.put("followId", follow==null?null:follow.getFollowId());
        result.put("follwingCnt", follwingCnt);
        result.put("follwerCnt", follwerCnt);
        return BaseResponse.success(result);
    }

    @GetMapping("/profile/{userid}")
    @ApiOperation(value = "사용자 프로필 조회", notes = "사용자 닉네임, 레벨, 프로필 사진")
    public BaseResponse<?> getProfile(@ApiIgnore Authentication authentication,@PathVariable("userid") Long userId){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        User user = userService.getUserProfileByUserSeq(userId);
        UserBlock userBlock = userBlockService.findUserBlock(userDetails.getUserSeq(), userId);
        Map<String, Object> profile = new HashMap<>();
        profile.put("userNickName", user.getUserNickname());
        profile.put("level", user.getLevel());
        profile.put("profileImgFilePath", user.getProfileImgFilePath());
        profile.put("profileImgFileName", user.getProfileImgFileName());
        profile.put("isBlocked", (userBlock==null?false:true));
        profile.put("blockId",(userBlock==null)?null:userBlock.getBlockId());
        return BaseResponse.success(profile);
    }

    @PostMapping("/follow/{follow-userid}")
    @ApiOperation(value = "사용자 팔로우")
    public BaseResponse<?> followUser(@ApiIgnore Authentication authentication, @PathVariable("follow-userid") Long followUserId){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        System.out.println("userSeq : "+userDetails.getUserSeq());
        Follow follow = followService.saveFollow(userDetails.getUserSeq(), followUserId);

        if(follow==null)
            return BaseResponse.success(null);
        return BaseResponse.success(follow.getFollowId());
    }

    @DeleteMapping("/follow/{followid}")
    @ApiOperation(value = "사용자 언팔로우")
    public BaseResponse<?> unfollowUser(@PathVariable("followid") Long followId){
        followService.deleteFollow(followId);
        return BaseResponse.success(null);
    }

    @GetMapping("/follow/{userid}")
    @ApiOperation(value = "팔로잉,팔로워 리스트 조회")
    public BaseResponse<?> getFollowList(@ApiIgnore Authentication authentication, @PathVariable("userid") Long userId){
        Map<String, List<FollowDto>> followList = followService.findFollowList(userId);
        return BaseResponse.success(followList);
    }

    @GetMapping("/hashtag")
    @ApiOperation(value = "해시태그 조회")
    public BaseResponse<?> getHashtag(){
        List<HashtagDto> hashtags = feedService.getHashtags();
        return BaseResponse.success(hashtags);
    }

    @GetMapping("/detail/{feedid}")
    @ApiOperation(value = "피드 상세 조회")
    public BaseResponse<?> getFeedDetail(@ApiIgnore Authentication authentication, @PathVariable("feedid") Long feedId){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        FeedResDto result = feedService.findByFeedId(userDetails.getUserSeq(),feedId);
        return BaseResponse.success(result);
    }

    @PostMapping("")
    @ApiOperation(value = "피드 등록")
    public BaseResponse<?> createFeed(@ApiIgnore Authentication authentication,FeedReqDto feed) throws IOException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        feed.setUserId(userDetails.getUserSeq());
        Feed result = feedService.saveFeed(feed,feed.getFiles());
        return BaseResponse.success(null);
    }

    @PutMapping("/{feedid}")
    @ApiOperation(value = "피드 수정")
    public BaseResponse<?> updateFeed(@ApiIgnore Authentication authentication, @PathVariable("feedid") Long feedId, @RequestBody FeedReqDto feed) throws IOException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        feed.setUserId(userDetails.getUserSeq());
        System.out.println(feed.toString());
        Feed result = feedService.updateFeed(feed, feedId);
        if(result==null)    return BaseResponse.fail();
        return BaseResponse.success(null);
    }

    @DeleteMapping("/{feedid}")
    @ApiOperation(value = "피드 삭제")
    public BaseResponse<?> deleteFeed(@ApiIgnore Authentication authentication, @PathVariable("feedid") Long feedId) throws IOException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        System.out.println(feedId);
        Boolean result=feedService.deleteFeed(feedId,userDetails.getUserSeq());
        if(result)  return BaseResponse.success(null);
        return BaseResponse.fail();
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

    @GetMapping("/block/list")
    @ApiOperation(value = "차단 사용자 리스트 조회")
    public BaseResponse getBlockedList(@ApiIgnore Authentication authentication){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        List<UserBlockDto> userBlockList = userBlockService.findUserBlockList(userDetails.getUserSeq());
        return BaseResponse.success(userBlockList);
    }

    @PostMapping("/block/{block-userid}")
    @ApiOperation(value = "사용자 차단 등록")
    public BaseResponse createBlock(@ApiIgnore Authentication authentication, @PathVariable("block-userid") Long blockUserId){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        UserBlock userBlock = userBlockService.saveUserBlock(userDetails.getUserSeq(), blockUserId);
        if(userBlock==null) return BaseResponse.fail();
        else return BaseResponse.success(null);
    }

    @DeleteMapping("/unblock/{blockid}")
    @ApiOperation(value = "사용자 차단 취소")
    public BaseResponse deleteBlock(@ApiIgnore Authentication authentication, @PathVariable("blockid") Long blockId){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        userBlockService.deleteUserBlock(blockId);
        return BaseResponse.success(null);
    }

    // 피드 댓글 생성
    @PostMapping("/comment")
    @ApiOperation(value = "피드 댓글 생성")
    public BaseResponse<?> createFeedComment(@ApiIgnore Authentication authentication, @RequestBody FeedCommentReqDto feedCommentReqDto) throws IOException{
        Long userSeq = ((CustomUserDetails) authentication.getDetails()).getUserSeq();
        Long id = feedService.createFeedComment(feedCommentReqDto, userSeq);
        return BaseResponse.success(null);
    }

    // 피드 댓글 삭제
    @DeleteMapping("/comment/{commentid}")
    @ApiOperation(value = "피드 댓글 삭제")
    public BaseResponse<?> deleteFeedComment(@ApiIgnore Authentication authentication,@PathVariable("commentid") Long commentId){
        Long userSeq = ((CustomUserDetails) authentication.getDetails()).getUserSeq();
        Long id = feedService.deleteFeedComment(commentId, userSeq);
        if (id == null){
            return BaseResponse.fail();
        }else{
            return BaseResponse.success(null);
        }
    }

    @PostMapping("/comment/recomment")
    @ApiOperation(value = "피드 대댓글 생성")
    public BaseResponse<?> createFeedRecomment(@ApiIgnore Authentication authentication, @RequestBody FeedCommentReqDto feedCommentReqDto) throws IOException{
        Long userSeq = ((CustomUserDetails) authentication.getDetails()).getUserSeq();
        Long id = feedService.createFeedRecomment(feedCommentReqDto, userSeq);
        return BaseResponse.success(null);
    }

    @DeleteMapping("/comment/recomment/{recommentid}")
    @ApiOperation(value = "피드 대댓글 삭제")
    public BaseResponse<?> deleteFeedReComment(@ApiIgnore Authentication authentication, @PathVariable("recommentid") Long recommentId){
        Long userSeq = ((CustomUserDetails) authentication.getDetails()).getUserSeq();
        Long id = feedService.deleteFeedReComment(recommentId, userSeq);
        if (id == null){
            return BaseResponse.fail();
        }else{
            return BaseResponse.success(null);
        }
    }

    @GetMapping("/comment/{feedid}")
    @ApiOperation(value = "피드 댓글 상세조회")
    public BaseResponse<?> getFeedCommentDetail(@ApiIgnore Authentication authentication, @PathVariable("feedid") Long feedId){
        List<FeedCommentDto> result = feedService.getFeedDetail(feedId);
        return BaseResponse.success(result);
    }


}
