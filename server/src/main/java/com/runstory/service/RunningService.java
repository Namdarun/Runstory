package com.runstory.service;

import com.runstory.api.request.RunningCrewReqDto;
import com.runstory.api.response.RunningMainResDto;
import com.runstory.api.response.RunningDetailSumDto;
import com.runstory.domain.running.dto.RunningBoardCommentDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;

public interface RunningService {
    // CreatePage
    void createRunningCrew(RunningCrewReqDto runningCrewReqDto, Long userseq, MultipartFile runningImg) throws Exception;

    // MainPage
    List<RunningMainResDto> findByLocation(float latitude, float longitude);
    List<RunningMainResDto> findByToday();
    List<HashMap<String, List<RunningMainResDto>>> selectRunningCrew(float longitude, float latitude, Long userSeq);

    // DetailPage
    RunningDetailSumDto findRunningDetail(Long id, Long userseq);
    Long deleteRunningCrew(Long id);
    void updateRunningCrew(RunningCrewReqDto newRunningCrewReqDto, MultipartFile runningImg) throws Exception;

    // DetailPage의 여러가지 기능
    Long reservationRunningCrew(Long runningid, Long userseq);
    Long deleteRunningReservation(Long runningid, Long userSeq);
    void runningValid(Long runningId,Long userseq);


    // Comment
    Long createRunningComment(RunningBoardCommentDto runningBoardCommentDto, Long userseq, Long runninid);
    Long deleteRunningComment(Long commentid);

    // Dibs
    Long createDibsRunningCrew(Long runningid, Long userseq);
    Long deleteDibsRunningCrew(Long runningid, Long userSeq);

    // 나의 페이지
    List<HashMap<String, List<RunningMainResDto>>> myRunningfunction(Long userseq);

    //검색 페이지
    List<RunningMainResDto> searchByCrewName(String crewName, Long lastrunningId, int size);
}
