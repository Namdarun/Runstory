package com.runstory.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.runstory.domain.feed.PublicScope;
import com.runstory.domain.feed.entity.Feed;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.runstory.domain.feed.entity.QFeed.*;

@Repository
@RequiredArgsConstructor
public class FeedRepositoryImpl implements FeedRepositoryCustom{
    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 개인 피드 조회
     * @param userId
     * @param isfollow
     * @return
     */
    @Override
    public List<Feed> searchByUserId(Long userId, Boolean isfollow) {
        JPAQuery<Feed> query = jpaQueryFactory.selectFrom(feed);
        //팔로우 여부에 따른 피드 조회
        if(isfollow){
            query.where(feed.user.userSeq.eq(userId)
                            .and(feed.publicScope.in(PublicScope.PUBLIC, PublicScope.FRIEND)))
                    .orderBy(feed.regdate.desc());
        }else{
            query.where(feed.user.userSeq.eq(userId)
                    .and(feed.publicScope.in(PublicScope.PUBLIC)))
                    .orderBy(feed.regdate.desc());
        }
        List<Feed> result = query.fetch();
        return result;
    }

}
