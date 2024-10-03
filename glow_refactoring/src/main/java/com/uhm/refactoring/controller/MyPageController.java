package com.uhm.refactoring.controller;

import com.uhm.refactoring.dto.MyPageResponse;
import com.uhm.refactoring.dto.PostDto;
import com.uhm.refactoring.dto.UserInfoDto;
import com.uhm.refactoring.service.PostService;
import com.uhm.refactoring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyPageController {

    private final UserService userService;
    private final PostService postService;

    @Autowired
    public MyPageController(UserService userService, PostService postService) {
        this.userService = userService;
        this.postService = postService;
    }

    @GetMapping("/mypage/{userId}")
    public ResponseEntity<MyPageResponse> getMyPage(@PathVariable Long userId) {
        UserInfoDto userInfoDto = userService.getUserById(userId);
        List<PostDto> posts = postService.getPostsByUserId(userId);

        MyPageResponse response = new MyPageResponse(userInfoDto, posts);
        return ResponseEntity.ok(response);
    }
}
