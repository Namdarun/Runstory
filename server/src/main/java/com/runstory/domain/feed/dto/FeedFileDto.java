package com.runstory.domain.feed.dto;

import com.runstory.domain.feed.entity.FeedFile;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FeedFileDto {
    private Long feedFileId;
    private Long feedId;
    private String filePath;
    private String fileName;

    public FeedFileDto(FeedFile feedFile) {
        this.feedFileId = feedFile.getFeedFileId();
        this.feedId = feedFile.getFeed().getFeedId();
        this.filePath = feedFile.getFilePath();
        this.fileName = feedFile.getFileName();
    }
}
