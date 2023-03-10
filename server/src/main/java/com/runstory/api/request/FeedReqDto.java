package com.runstory.api.request;

import com.runstory.domain.feed.PublicScope;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FeedReqDto {
    private Long userId;
    private String content;
    private List<Long> selectedHashTags;
    private PublicScope publicScope;
    private LocalDateTime regdate;
    private LocalDateTime updatedate;
    MultipartFile[] files;

    @Override
    public String toString() {
        return "FeedReqDto{" +
                "userId=" + userId +
                ", content='" + content + '\'' +
                ", selectedHashTags=" + Arrays.toString(selectedHashTags.toArray()) +
                ", publicScope=" + publicScope +
                '}';
    }
}