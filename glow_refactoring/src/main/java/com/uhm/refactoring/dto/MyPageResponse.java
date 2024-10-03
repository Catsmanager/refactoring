package com.uhm.refactoring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class MyPageResponse {
    private UserInfoDto userInfoDto;
    private List<PostDto> posts;
}
