package com.uhm.refactoring.controller;

import com.uhm.refactoring.dto.MyPageResponse;
import com.uhm.refactoring.dto.PostDto;
import com.uhm.refactoring.dto.UserInfoDto;
import com.uhm.refactoring.service.MyPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyPageController {

    private final MyPageService myPageService;

    @Autowired
    public MyPageController(MyPageService myPageService) {
        this.myPageService = myPageService;
    }

    //유저가 쓴 글 목록
    @GetMapping("/mypage/{userId}")
    public ResponseEntity<MyPageResponse> getMyPage(@PathVariable Long userId) {
        UserInfoDto userInfoDto = myPageService.getUserById(userId);
        List<PostDto> posts = myPageService.getPostsByUserId(userId);

        MyPageResponse response = new MyPageResponse(userInfoDto, posts);
        return ResponseEntity.ok(response);
    }
}
