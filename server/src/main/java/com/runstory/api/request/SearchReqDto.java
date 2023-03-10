package com.runstory.api.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SearchReqDto {
    private int type;
    private String keyword; //해시태그->숫자로 다시 처리해야함, 러닝 모임 검색 기준을 정해야함
    private Long lastId;
    private final int size = 9;
}
