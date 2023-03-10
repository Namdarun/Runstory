package com.runstory.common.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;

public class FileUtil {

    public HashMap<String, String> fileCreate(String hostname, String type, MultipartFile image) throws IOException {
        HashMap<String, String> result = new HashMap<>();

        //서버에 파일 저장
        UUID uuid = UUID.randomUUID();
        String name = uuid.toString() + image.getOriginalFilename();
        String path = "";
        File file = null;

        if (hostname.substring(0, 7).equals("DESKTOP")) {
            path = "C:/runTogether/uploads/"+type+"/";
            file = new File(path + name);
        } else {
            path = "/var/lib/runstory/"+type+"/";
            file = new File(path + name);
        }

        if (!file.getParentFile().exists())
            file.getParentFile().mkdirs();

        image.transferTo(file);
        result.put("filepath",path);
        result.put("filename",name);
        return result;
    }
}
