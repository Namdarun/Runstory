package com.runstory.domain.running;

import javax.persistence.*;

import com.runstory.api.request.RunningCrewReqDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RunningDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private GenderType genderType;

    @Column(columnDefinition = "int default 0", nullable = false)
    @Comment("남자 인원")
    private int man;

    @Column(columnDefinition = "int default 0", nullable = false)
    @Comment("여자 인원")
    private int women;

    @Column(columnDefinition = "int default 0", nullable = false)
    @Comment("총 인원")
    private int total;

    @Column(columnDefinition = "int default 0", nullable = false)
    @Comment("최소 나이")
    private int minAge;

    @Column(columnDefinition = "int default 10000000", nullable = false)
    @Comment("최대 나이")
    private int maxAge;

    @Column(columnDefinition = "boolean default false", nullable = false)
    @Comment("강아지 여부")
    private boolean hasDog;

    public RunningDetail(RunningCrewReqDto runningCrewReqDto){
        this.genderType = runningCrewReqDto.getGenderType();
        this.man = runningCrewReqDto.getMan();
        this.women = runningCrewReqDto.getWomen();
        this.total = runningCrewReqDto.getTotal();
        this.minAge = runningCrewReqDto.getMinAge();
        this.maxAge = runningCrewReqDto.getMaxAge();
        this.hasDog = runningCrewReqDto.isHasDog();
    }

    public void runningDetailUpdate(RunningCrewReqDto runningCrewReqDto){
        this.man = runningCrewReqDto.getMan();
        this.women = runningCrewReqDto.getWomen();
        this.total = runningCrewReqDto.getTotal();
        this.minAge = runningCrewReqDto.getMinAge();
        this.maxAge = runningCrewReqDto.getMaxAge();
        this.hasDog = runningCrewReqDto.isHasDog();
    }
}
