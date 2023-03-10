package com.runstory.domain.running.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runstory.domain.running.Running;
import com.runstory.domain.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RunningDto {
    private Long runningId;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime regdate;
    private Boolean isFinished;
    private float distance;
    private UserDto user;


    public RunningDto(Running running){
        this.runningId = running.getRunningId();
        this.imgFilePath = running.getImgFilePath();
        this.imgFileName = running.getImgFileName();
        this.crewName = running.getCrewName();
        this.runningContent = running.getRunningContent();
        this.startLocation = running.getStartLocation();
        this.startLongitude = running.getStartLongitude();
        this.startLatitude = running.getStartLatitude();
        this.endLatitude = running.getEndLatitude();
        this.endLongitude = running.getEndLongitude();
        this.endLocation = running.getEndLocation();
        this.startTime = running.getStartTime();
        this.endTime = running.getEndTime();
        this.regdate = running.getRegdate();
        this.isFinished = running.getIsFinished();
        this.distance = running.getDistance();
        this.user = new UserDto(running.getUser());
    }

}