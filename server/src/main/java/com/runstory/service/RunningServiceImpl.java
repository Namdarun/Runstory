package com.runstory.service;

import com.runstory.api.request.RunningCrewReqDto;
import com.runstory.api.response.RunningMainResDto;
import com.runstory.common.util.FileUtil;
import com.runstory.domain.hashtag.HashtagType;
import com.runstory.domain.hashtag.entity.Hashtag;
import com.runstory.domain.hashtag.entity.SelectedHashtag;
import com.runstory.domain.running.*;
import com.runstory.api.response.RunningDetailSumDto;
import com.runstory.domain.running.dto.RunningBoardCommentDto;
import com.runstory.domain.user.entity.User;
import com.runstory.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.InetAddress;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RunningServiceImpl implements RunningService {

    private final RunningRepository runningrepository;
    private final RunningDetailRepository runningDetailRepository;
    private final HashtagRepository hashtagRepository;
    private final SelectedHashtagRepository selectedHashtagRepository;
    private final UserRepository userRepository;
    private final RunningCommentRepository runningCommentRepository;
    private final RunningUserRepository runningUserRepository;
    private final RunningDibsRepository runningDibsRepository;

    @Override
    @Transactional
    public void createRunningCrew(RunningCrewReqDto runningCrewReqDto, Long userSeq, MultipartFile runningImg) throws Exception{// User user 현재 유저를 들고와야한다.
        // 유저 전체의 데이터를 들고온다.
        User user = userRepository.findByUserSeq(userSeq);
//        String path = "/var/lib/runstory"; // /home/ubuntu/images;x`
//        String imageFileName = runningImg.getOriginalFilename();
//        File file = new File(path+imageFileName);
//        runningImg.transferTo(file);

        String hostname = InetAddress.getLocalHost().getHostName();
        FileUtil fileUtil = new FileUtil();
        HashMap<String, String> file = fileUtil.fileCreate(hostname, "running",runningImg);

//        Running running = new Running(runningCrewReqDto, user, imageFileName, path);
        Running running = new Running(runningCrewReqDto, user, file.get("filename"), file.get("filepath"));
        runningrepository.save(running);
        RunningDetail runningDetail = new RunningDetail(runningCrewReqDto);
        runningDetailRepository.save(runningDetail);
        // RunningHashTag
        for (Long hashtagId : runningCrewReqDto.getHastag()){
            // HashTag 관련 Repository 필요
            Hashtag hashtag = hashtagRepository.findHashtagByHashtagId(hashtagId);
            SelectedHashtag selectedHashtag = SelectedHashtag.builder()
                    .hashtagType(HashtagType.RUNNING)
                    .running(running)
                    .hashtag(hashtag)
                    .build();
            selectedHashtagRepository.save(selectedHashtag);
        }
    }

    @Override
    public List<RunningMainResDto> findByLocation(float latitude, float longitude) {
        List<Running> runnings = runningrepository.findByLocation(latitude, longitude);
        List<RunningMainResDto> result = runnings.stream().map(r->new RunningMainResDto(r)).collect(Collectors.toList());
        return result;
    }

    @Override
    public List<RunningMainResDto> findByToday() {
        List<Running> runnings = runningrepository.findByStartTime();
        List<RunningMainResDto> result = runnings.stream().map(r->new RunningMainResDto(r)).collect(Collectors.toList());
        return result;
    }

    @Override
    public List<HashMap<String, List<RunningMainResDto>>> selectRunningCrew(float longitude, float latitude, Long userSeq){
        List<Running> runninglist = runningrepository.findByIsFinished(false); // 데이터 전체를 들고온다.
        List<HashMap<String, List<RunningMainResDto>>> result = new ArrayList<>();
        User user = userRepository.findByUserSeq(userSeq);
        List<SelectedHashtag> userSelectedHashtags = selectedHashtagRepository.findAllByUser(user);

        for (SelectedHashtag selectedHashtag : userSelectedHashtags){
            Hashtag hashtag = hashtagRepository.findHashtagByHashtagId(selectedHashtag.getHashtag().getHashtagId());
            List<SelectedHashtag> selectedHashtags = selectedHashtagRepository.findAllByHashtag(hashtag);
            HashMap<String, List<RunningMainResDto>> hash = new HashMap<>();
            List<RunningMainResDto> runningMainResDtos = new ArrayList<>();
            for (SelectedHashtag selectedHashtag1 : selectedHashtags){
                for (Running running: runninglist){
                    if (selectedHashtag1.getRunning() != null && selectedHashtag1.getRunning().getRunningId() == running.getRunningId()){
                        RunningMainResDto runningMainResDto = new RunningMainResDto(selectedHashtag1.getRunning());
                        runningMainResDtos.add(runningMainResDto);
                    }
                }
            }
            hash.put(hashtag.getHashtagName(), runningMainResDtos);
            result.add(hash); // result값 안에 넣는다.
        }
        return result;
    }
    
    // DetailPage 들고오기
    @Override
    public RunningDetailSumDto findRunningDetail(Long id, Long userseq){
        User user = userRepository.findByUserSeq(userseq);
        Running running = runningrepository.getById(id);
        RunningDetail runningDetail = runningDetailRepository.getById(id);
        RunningUser runningUser = runningUserRepository.findByRunningAndUser(running, user);
        if (runningUser == null){ // Table에 존재하지 않는다면
            RunningDetailSumDto runningDetailSumDto = new RunningDetailSumDto(running, runningDetail, userseq, true);
            return runningDetailSumDto;
        }else{
            RunningDetailSumDto runningDetailSumDto = new RunningDetailSumDto(running, runningDetail, userseq, runningUser.getAuthentication());
            return runningDetailSumDto;
        }
    }

    // DetailPage 삭제하기
    @Override
    @Transactional
    public Long deleteRunningCrew(Long id){
        Running running = runningrepository.getById(id);
        RunningDetail runningDetail = runningDetailRepository.getById(id);
        runningrepository.deleteById(id);
        runningDetailRepository.deleteById(id);
        return id;
    }

    // DetailPage 수정하기
    @Override
    @Transactional
    public void updateRunningCrew(RunningCrewReqDto newRunningCrewReqDto, MultipartFile runningImg) throws Exception{
//        String path = "/var/lib/runstory/"; //  /home/ubuntu/images
//        String imageFileName = runningImg.getOriginalFilename();
//        File file = new File(path+imageFileName);
//        runningImg.transferTo(file);

        String hostname = InetAddress.getLocalHost().getHostName();
        FileUtil fileUtil = new FileUtil();
        HashMap<String, String> file = fileUtil.fileCreate(hostname, "running",runningImg);

        Running running = runningrepository.getById(newRunningCrewReqDto.getId()); // 값을 들고온다.
        RunningDetail runningDetail = runningDetailRepository.getById(newRunningCrewReqDto.getId());
//        running.RunningUpdate(newRunningCrewReqDto, imageFileName, path);
        running.RunningUpdate(newRunningCrewReqDto, file.get("filename"), file.get("filepath"));
        runningrepository.save(running);
        runningDetail.runningDetailUpdate(newRunningCrewReqDto);
        runningDetailRepository.save(runningDetail);
        // 해쉬태그를 변경
        List<SelectedHashtag> selectedHashtags = selectedHashtagRepository.findAllByRunning(running);
        for (SelectedHashtag selectedHashtag : selectedHashtags){

            selectedHashtagRepository.deleteById(selectedHashtag.getSelectedHashtagId());
        }

        for (Long hashtagId : newRunningCrewReqDto.getHastag()){
            Hashtag hashtag = hashtagRepository.findHashtagByHashtagId(hashtagId);
            SelectedHashtag selectedHashtag = SelectedHashtag.builder()
                    .hashtagType(HashtagType.RUNNING)
                    .running(running)
                    .hashtag(hashtag)
                    .build();
            selectedHashtagRepository.save(selectedHashtag);
        }


//        for (SelectedHashtag selectedHashtag : selectedHashtags){
//            boolean isHash = false;
//            for (Long hashtagId : newRunningCrewReqDto.getHastag()){
//                if (selectedHashtag.getSelectedHashtagId().equals(hashtagId)){
//                    isHash = true;
//                    break;
//                }
//            }
//            if (!isHash){
//                selectedHashtagRepository.deleteById(selectedHashtag.getSelectedHashtagId());
//            }
//        }
    }

    // Reservation
    @Override
    @Transactional
    public Long reservationRunningCrew(Long runningid, Long userseq){ // 예약하기
        Running running = runningrepository.getById(runningid);
        User user = userRepository.findByUserSeq(userseq);
        RunningUser oldRunningUser = runningUserRepository.findByRunningAndUser(running, user); // User가 이미 있는지를 확인한다.
        if (oldRunningUser == null){
            RunningUser runningUser = new RunningUser(running, user);
            runningUserRepository.save(runningUser);
            return userseq;
        }else{
            return -1L;
        }
    }

    @Override
    @Transactional
    public Long deleteRunningReservation(Long runningid, Long userSeq){
        Running running = runningrepository.getById(runningid);
        User user = userRepository.findByUserSeq(userSeq);
        RunningUser oldRunningUser = runningUserRepository.findByRunningAndUser(running, user);
        if (oldRunningUser == null){
            return -1L;
        }else{ // 만약 있으면
            runningUserRepository.deleteById(oldRunningUser.getId());
            return userSeq;
        }
    }


    //Dibs
    @Override
    @Transactional
    public Long createDibsRunningCrew(Long runningid, Long userseq){ // 예약하기
        Running running = runningrepository.getById(runningid);
        User user = userRepository.findByUserSeq(userseq);
        RunningDibs oldRunningUser = runningDibsRepository.findByRunningAndUser(running, user); // User가 이미 있는지를 확인한다.
        if (oldRunningUser == null){
            RunningDibs runningDibs = new RunningDibs(running, user);
            runningDibsRepository.save(runningDibs);
            return userseq;
        }else{
            return -1L;
        }
    }

    @Override
    @Transactional
    public Long deleteDibsRunningCrew(Long runningid, Long userSeq){
        Running running = runningrepository.getById(runningid);
        User user = userRepository.findByUserSeq(userSeq);
        RunningDibs previousDibsUser = runningDibsRepository.findByRunningAndUser(running, user);
        if (previousDibsUser == null){
            return -1L;
        }else{ // 만약 있으면
            runningDibsRepository.deleteById(previousDibsUser.getId());
            return userSeq;
        }
    }

    @Override
    @Transactional
    public void runningValid(Long runningId, Long userSeq){ // m로 생각하고 사용한다.
        User user = userRepository.findByUserSeq(userSeq);
        Running running = runningrepository.getById(runningId);
        int distance = (int) runningrepository.getById(runningId).getDistance();
        int newlevel = user.getLevel();
        int newDistance =  user.getExperience() + distance;
        if (newDistance > 100000){
            newlevel ++;
            newDistance -= 100000;
            user.UserExperienceUpdate(newlevel,newDistance);
            userRepository.save(user);
        }else{
            user.UserExperienceUpdate(newlevel, newDistance);
            userRepository.save(user);
        }
        RunningUser runningUser = runningUserRepository.findByRunningAndUser(running, user);
        runningUser.RunningUserUpdate(true);
        runningUserRepository.save(runningUser);
    }

    // Comment
    @Override
    @Transactional
    public Long createRunningComment(RunningBoardCommentDto runningBoardCommentDto, Long userseq, Long runninid){
        Running running = runningrepository.getById(runninid);
        User user = userRepository.findByUserSeq(userseq);
        RunningBoardComment runningBoardComment = new RunningBoardComment(runningBoardCommentDto, user, running);
        runningCommentRepository.save(runningBoardComment);
        // 단톡방에 추가하기!
        return userseq;
    }

    @Override
    @Transactional
    public Long deleteRunningComment(Long commentid){
        runningCommentRepository.deleteById(commentid);
        return commentid;
    }

    // MyPage
    @Override
    public List<HashMap<String, List<RunningMainResDto>>> myRunningfunction(Long userseq){
        User user = userRepository.findByUserSeq(userseq); // user 들고 온다.
        List<HashMap<String, List<RunningMainResDto>>> result = new ArrayList<>();
        List<String> names = Arrays.asList("mycrew", "joincrew", "dibscrew", "pastcrew");
        for (String name : names){
            HashMap<String, List<RunningMainResDto>> hashMap = new HashMap<>();
            List<RunningMainResDto> runningMainResDtos = new ArrayList<>();
            List<Running> runnings = new ArrayList<>();
            switch (name){
                case "mycrew":
                    runnings = runningrepository.findAllByIsFinishedAndUser(false, user);
                    break;
                case "joincrew":
                    List<RunningUser> runningUsers = runningUserRepository.findAllByUser(user); // 참가되어있는 경우
                    for (RunningUser runningUser :runningUsers){
                        runnings.add(runningUser.getRunning());
                    }
                    break;

                case "dibscrew":
                    List<RunningDibs> runningDibs = runningDibsRepository.findAllByUser(user);
                    for (RunningDibs runningDib : runningDibs){
                        runnings.add(runningDib.getRunning());
                    }
                    break;

                case "pastcrew":
                    runnings = runningrepository.findAllByIsFinishedAndUser(true, user);
                    break;
            }

            for (Running running : runnings){
                RunningMainResDto runningMainResDto = new RunningMainResDto(running);
                runningMainResDtos.add(runningMainResDto);
            }
            hashMap.put(name, runningMainResDtos);
            result.add(hashMap);
        }
        return result;
    }

    @Override
    public List<RunningMainResDto> searchByCrewName(String crewName, Long lastrunningId, int size) {
        PageRequest pageRequest = PageRequest.of(0, size);
        Page<Running> runnings = runningrepository.findByCrewNameContainsAndRunningIdLessThanAndIsFinishedOrderByRunningIdDesc(crewName,lastrunningId,false,pageRequest);
        List<RunningMainResDto> result = runnings.stream().map(r->new RunningMainResDto(r)).collect(Collectors.toList());
        return result;
    }

}
