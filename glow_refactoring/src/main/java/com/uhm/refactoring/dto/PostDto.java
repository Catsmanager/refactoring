package com.uhm.refactoring.dto;

import com.uhm.refactoring.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private User user;
    private Long userId;
    private String username;

    public PostDto(Long id, String title, String content, LocalDateTime createdAt, User user) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.userId = user.getId();
        this.username = user.getName();
    }
}
