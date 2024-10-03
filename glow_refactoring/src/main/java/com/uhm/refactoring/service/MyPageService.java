package com.uhm.refactoring.service;

import com.uhm.refactoring.dto.PostDto;
import com.uhm.refactoring.dto.UserInfoDto;
import com.uhm.refactoring.entity.Post;
import com.uhm.refactoring.entity.User;
import com.uhm.refactoring.repository.PostRepository;
import com.uhm.refactoring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MyPageService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Autowired
    public MyPageService(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public UserInfoDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException(String.valueOf(userId)));
        return new UserInfoDto(user.getName(), user.getEmail());
    }

    public List<PostDto> getPostsByUserId(Long userId) {
        List<Post> posts = postRepository.findByUserId(userId);
        return posts.stream()
                .map(post -> new PostDto(post.getId(), post.getTitle(), post.getContent()))
                .collect(Collectors.toList());
    }
}