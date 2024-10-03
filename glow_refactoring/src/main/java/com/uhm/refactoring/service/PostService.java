package com.uhm.refactoring.service;

import com.uhm.refactoring.dto.PostDto;
import com.uhm.refactoring.entity.Post;
import com.uhm.refactoring.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {
    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<PostDto> getPostsByUserId(Long userId) {
        List<Post> posts = postRepository.findByUserId(userId);
        return posts.stream()
                .map(post -> new PostDto(post.getId(), post.getTitle(), post.getContent()))
                .collect(Collectors.toList());
    }
}
