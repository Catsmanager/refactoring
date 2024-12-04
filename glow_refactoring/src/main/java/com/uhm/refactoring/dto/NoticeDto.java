package com.uhm.refactoring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class NoticeDto {
    private Long id;
    private String author;
    private String title;
    private String content;
    private LocalDateTime createdAt;
}
