package com.runstory.api.request;

import com.runstory.domain.running.GenderType;
import java.time.LocalDateTime;
import java.util.List;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RunningCrewReqDto {
    private Long id;
    private String crewName;
    private String runningContent;
    private String startLocation;
    private String endLocation;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startTime;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endTime;
    private float startLongitude;
    private float startLatitude;
    private float endLongitude;
    private float endLatitude;
    private float distance;

    // runningDetail에 대한 dto
    private GenderType genderType;
    private int man;
    private int women;
    private int total;
    private int minAge;
    private int maxAge;
    private boolean hasDog;

    // SelectedHashTag에 들어가기 위한 dto
    private List<Long> hastag;

    MultipartFile runningImg;
}
