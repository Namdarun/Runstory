package com.runstory.api.controller;

import com.runstory.api.request.SearchReqDto;
import com.runstory.api.request.SearchType;
import com.runstory.api.response.BaseResponse;
import com.runstory.common.auth.CustomUserDetails;
import com.runstory.service.FeedService;
import com.runstory.service.RunningService;
import com.runstory.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
@Api(tags = "인덱스 페이지 API")
public class SearchController {
    private final UserService userService;
    private final FeedService feedService;
    private final RunningService runningService;
    @PostMapping("")
    @ApiOperation(value = "사용자, 러닝모임, 피드를 조회한다")
    public BaseResponse<?> searchByKeyword(@ApiIgnore Authentication authentication, @RequestBody SearchReqDto search){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getDetails();
        List<?> result = new ArrayList<>();

        //사용자 검색
        System.out.println("search type: "+search.getType());
        if(search.getType()== SearchType.USER.ordinal()){
            result = userService.searchByUserNickname(search.getKeyword(), search.getLastId(), search.getSize());
        }
        else if(search.getType()== SearchType.FEED.ordinal()){
            //해시태그 문자열 -> Long 처리
            result = feedService.searchByHashtag(search.getKeyword(), search.getLastId(), search.getSize());
        }
        else if(search.getType()== SearchType.RUNNING.ordinal()){
            result = runningService.searchByCrewName(search.getKeyword(), search.getLastId(), search.getSize());
        }
        return BaseResponse.success(result);
    }
}
