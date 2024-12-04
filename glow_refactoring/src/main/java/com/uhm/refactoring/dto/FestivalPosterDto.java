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
public class FestivalPosterDto {
    private Long id;
    private String title;
    private String host;
    private String poster;
}
