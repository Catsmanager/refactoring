package com.uhm.refactoring.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AddPostRequest {
    private String title;
    private String content;
    private Long userId;
    private Long festivalId;
}
