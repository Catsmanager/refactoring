package com.uhm.refactoring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddPostRequest {
    private String title;
    private String content;
    private Long userId;
    private Long festivalId;
}
