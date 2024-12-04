package com.uhm.refactoring.controller;

import com.uhm.refactoring.dto.AddPostRequest;
import com.uhm.refactoring.dto.FestivalDto;
import com.uhm.refactoring.dto.FestivalPosterDto;
import com.uhm.refactoring.dto.PostDto;
import com.uhm.refactoring.service.FestivalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FestivalController {
    private final FestivalService festivalService;

    @Autowired
    public FestivalController(FestivalService festivalService) {
        this.festivalService = festivalService;
    }

    //축제 목록
    @GetMapping("/festivals")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<FestivalPosterDto>> getFestivals() {
        List<FestivalPosterDto> festivals = festivalService.getFestivals();
        return ResponseEntity.ok(festivals);
    }

    //축제 열람
    @GetMapping("/festivals/{festivalId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<FestivalDto> getFestival(@PathVariable(name = "festivalId") Long festivalId) {
        FestivalDto festival = festivalService.openFestival(festivalId);
        return ResponseEntity.ok(festival);
    }

    //공모전 게시글 작성
    @PostMapping("/festivals/{festivalId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<PostDto> createPost(@PathVariable(name = "festivalId") Long festivalId,
                                              @RequestBody AddPostRequest addPostRequest) {
        PostDto createdPost = festivalService.createPost(festivalId, addPostRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }
}
