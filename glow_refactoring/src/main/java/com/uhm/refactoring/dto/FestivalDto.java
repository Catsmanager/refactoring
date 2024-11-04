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
    private String host;
    private String title;
    private String content;
    private String poster;
    private LocalDateTime createdAt;

    public FestivalDto(String title, String poster) {
        this.title = title;
        this.poster = poster;
    }
}
