package com.uhm.refactoring.service;

import com.uhm.refactoring.dto.NoticeDto;
import com.uhm.refactoring.entity.Notice;
import com.uhm.refactoring.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NoticeService {
    private final NoticeRepository noticeRepository;

    @Autowired
    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    //공지 목록
    public List<NoticeDto> getNotices() {
        List<Notice> notices = noticeRepository.findAll();

        return notices.stream()
                .map(notice -> new NoticeDto(notice.getId(), notice.getAuthor(), notice.getTitle(), notice.getContent(),
                        notice.getCreatedAt()))
                .collect(Collectors.toList());
   }

   //공지 열람
   public NoticeDto openNotice(Long id) {
       Notice notice = noticeRepository.findById(id)
               .orElseThrow(() -> new IllegalArgumentException(String.valueOf(id)));

        return new NoticeDto(notice.getId(), notice.getAuthor(), notice.getTitle(), notice.getContent(), notice.getCreatedAt());
   }
}
