package com.runstory;

import com.runstory.domain.hashtag.entity.SelectedHashtag;
import com.runstory.repository.SelectedHashtagRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class RunStoryApplicationTests {
    @Autowired
    private  SelectedHashtagRepository selectedHashtagRepository;
    @Test
    void 선택된해시태그가져오기() {
        List<SelectedHashtag> tags = selectedHashtagRepository.findByFeedIdOrderByHashtagIdAsc(1020L);
        for (SelectedHashtag s: tags)
            System.out.println(s.getHashtag().getHashtagId());
    }

}
