package com.uhm.refactoring.controller;

import com.uhm.refactoring.dto.NoticeDto;
import com.uhm.refactoring.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NoticeController {
    private final NoticeService noticeService;

    @Autowired
    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    //공지 목록
    @GetMapping("/notices")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<NoticeDto>> getNotices() {
        List<NoticeDto> notices = noticeService.getNotices();
        return ResponseEntity.ok(notices);
    }

    //공지 열람
    @GetMapping("/notices/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<NoticeDto> getNotice(@PathVariable(name = "id") Long id) {
        NoticeDto notice = noticeService.openNotice(id);
        return ResponseEntity.ok(notice);
    }
}
