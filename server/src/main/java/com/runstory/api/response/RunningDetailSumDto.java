package com.runstory.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runstory.domain.hashtag.dto.SelectedHashtagDto;
import com.runstory.domain.hashtag.entity.SelectedHashtag;
import com.runstory.domain.running.*;
import com.runstory.domain.running.dto.RunningBoardCommentDto;
import com.runstory.domain.running.dto.RunningUserDto;
import com.runstory.domain.user.entity.User;
import com.runstory.repository.UserRepository;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class RunningDetailSumDto {
    private Long id;
    private Long userId; // 현재 로그인중인 userId
    private String userNickName;
    private String imgFilePath;
    private String imgFileName;
    private String crewName;
    private String runningContent;
    private String startLocation;
    private String endLocation;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;
    private float startLongitude;
    private float startLatitude;
    private float endLongitude;
    private float endLatitude;
    private float distance;

    // runningDetail에 대한 dto
    private GenderType genderType;
    private int man; // 남자만일 경우
    private int women; // 여자만일 경우
    private int total; // 상관없을 경우
    private int minAge;
    private int maxAge;
    private boolean hasDog;

    private List<SelectedHashtagDto> selectedHashtags = new ArrayList<>(); // 해시태그
    private List<RunningBoardCommentDto> runningboardcomments = new ArrayList<>(); // 댓글
    private List<RunningUserDto> runningusers = new ArrayList<>(); // 참여 인원

    // 해당 사람이 작성자인지 달리는 사람인지를 확인
    private boolean isCreater;
    private boolean isRunner;
    private boolean isDibs;

    // 해당 사람이 인증이 되어있는지를 확인해주는 로직 처리
    private boolean validation;

    public RunningDetailSumDto(Running running, RunningDetail runningDetail, Long userseq, Boolean validation){
        this.id = running.getRunningId();
        this.userId = running.getUser().getUserSeq();
        this.userNickName = running.getUser().getUserNickname();
        this.imgFilePath = running.getImgFilePath();
        this.imgFileName = running.getImgFileName();
        this.crewName = running.getCrewName();
        this.runningContent = running.getRunningContent();
        this.startLocation = running.getStartLocation();
        this.endLocation = running.getEndLocation();
        this.startTime = running.getStartTime();
        this.endTime = running.getEndTime();
        this.startLongitude = running.getStartLongitude();
        this.startLatitude = running.getStartLatitude();
        this.endLongitude = running.getEndLongitude();
        this.endLatitude = running.getEndLatitude();
        this.distance = running.getDistance();
        this.genderType = runningDetail.getGenderType();
        this.minAge = runningDetail.getMinAge();
        this.maxAge = runningDetail.getMaxAge();
        this.hasDog = runningDetail.isHasDog();
        this.isCreater = false;
        this.isRunner = false;
        this.isDibs = false;
        this.validation = validation;

        int man = runningDetail.getMan();
        int women = runningDetail.getWomen();
        int total = runningDetail.getTotal();
        // 남자, 여자, 성별 무관에 따른 인원 수를 확인해주는 로직 처리
        for (RunningUser runningUser : running.getRunningusers()){
            int gender = runningUser.getUser().getGender();
            if (gender == 1){ // 남성일 경우
                if (man > 0){
                    man --;
                }else if(total > 0){
                    total --;
                }
            }else{ // 여성일 경우
                if (women > 0){
                    women --;
                }else if(total > 0){
                    total --;
                }
            }
        }
        this.man = man;
        this.women = women;
        this.total = total;

        // 생성자인지를 확인하는 방법
        if (running.getUser().getUserSeq().equals(userseq)){
            this.isCreater = true;
        }else{
            this.isCreater = false;
        }

        for (SelectedHashtag selectedHashtag : running.getSelectedHashtags()){
            SelectedHashtagDto selectedHashtagDto = new SelectedHashtagDto(selectedHashtag);
            selectedHashtags.add(selectedHashtagDto);
        }
        // 댓글 기능
        for (RunningBoardComment comment : running.getRunningboardcomments()){
            String userid = comment.getUser().getUserId();
            String userFileName = comment.getUser().getProfileImgFileName();
            String userNickName = comment.getUser().getUserNickname();
            RunningBoardCommentDto runningBoardCommentDto = RunningBoardCommentDto.builder()
                    .userId(userid)
                    .content(comment.getContent())
                    .regdate(comment.getRegdate())
                    .profileImgName(userFileName)
                    .userNickName(userNickName)
                    .build();
            runningboardcomments.add(runningBoardCommentDto);
        }
        // 참가인원
        for (RunningUser user : running.getRunningusers()){
            RunningUserDto runningUserDto = RunningUserDto.builder()
                    .userId(user.getId())
                    .build();
            runningusers.add(runningUserDto);
            if (userseq.equals(user.getUser().getUserSeq())){
                this.isRunner = true;
            }
        }
        // 찜했는지를 확인하는 기능
        for (RunningDibs dibs : running.getRunningDibs()){
            if (userseq.equals(dibs.getUser().getUserSeq())){
                this.isDibs = true;
                break;
            }
        }

    }
}
