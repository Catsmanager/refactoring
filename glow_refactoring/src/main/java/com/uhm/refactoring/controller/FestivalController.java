package com.uhm.refactoring.controller;

import com.uhm.refactoring.dto.AddPostRequest;
import com.uhm.refactoring.dto.FestivalDto;
import com.uhm.refactoring.entity.Festival;
import com.uhm.refactoring.service.FestivalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
