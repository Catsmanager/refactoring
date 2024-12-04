package com.uhm.refactoring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FestivalDto {
    private Long id;
    private String host;
    private String title;
    private String content;
    private String poster;
    private LocalDateTime createdAt;
}
