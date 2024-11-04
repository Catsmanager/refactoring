package com.uhm.refactoring.controller;

import com.uhm.refactoring.dto.AddPostRequest;
import com.uhm.refactoring.dto.FestivalDto;
import com.uhm.refactoring.dto.PostDto;
import com.uhm.refactoring.service.FestivalService;
import com.uhm.refactoring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class FestivalController {
    private final FestivalService festivalService;
    private final UserService userService;

    @Autowired
    public FestivalController(FestivalService festivalService, UserService userService) {
        this.festivalService = festivalService;
        this.userService = userService;
    }

    //축제 목록
    @GetMapping("/festivals")
    public ResponseEntity<List<FestivalDto>> getFestivals() {
        List<FestivalDto> festivals = festivalService.getFestivals();
        return ResponseEntity.ok(festivals);
    }

    //축제 열람
    @GetMapping("/festivals/{id}")
    public ResponseEntity<FestivalDto> getFestival(@PathVariable(name = "id") Long id) {
        FestivalDto festival = festivalService.openFestival(id);
        return ResponseEntity.ok(festival);
    }

    //공모전 게시글 작성
    @PostMapping("/festivals/{id}")
    public ResponseEntity<PostDto> createPost(@PathVariable(name = "id") Long id,
                                              @RequestBody AddPostRequest addPostRequest,
                                              Principal principal) {
        Long userId = userService.findIdByName(principal.getName());
        PostDto createdPost = festivalService.createPost(userId, id, addPostRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }
}
