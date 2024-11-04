package com.uhm.refactoring.service;

import com.uhm.refactoring.dto.AddPostRequest;
import com.uhm.refactoring.dto.FestivalDto;
import com.uhm.refactoring.dto.PostDto;
import com.uhm.refactoring.entity.Festival;
import com.uhm.refactoring.entity.Post;
import com.uhm.refactoring.entity.User;
import com.uhm.refactoring.repository.FestivalRepository;
import com.uhm.refactoring.repository.PostRepository;
import com.uhm.refactoring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FestivalService {
    private final FestivalRepository festivalRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Autowired
    public FestivalService(FestivalRepository festivalRepository, PostRepository postRepository,
                           UserRepository userRepository) {
        this.festivalRepository = festivalRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    //축제 목록
    public List<FestivalDto> getFestivals() {
        List<Festival> festivals = festivalRepository.findAll();

        return festivals.stream()
                .map(festival -> new FestivalDto(festival.getTitle(), festival.getPoster()))
                .collect(Collectors.toList());
    }

    //축제 열람
    public FestivalDto openFestival(Long id) {
        Festival festival = festivalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(String.valueOf(id)));

        return new FestivalDto(festival.getHost(), festival.getTitle(), festival.getContent(), festival.getPoster(),
                festival.getCreatedAt());
    }

    //공모전 게시글 작성
    public PostDto createPost(Long userId, Long festivalId, AddPostRequest addPostRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("invalid user id : " + userId));

        Festival festival = festivalRepository.findById(festivalId)
                .orElseThrow(() -> new IllegalArgumentException("invalid festival id : " + festivalId));

        Post post = new Post();
        post.setUser(user);
        post.setFestival(festival);
        post.setTitle(addPostRequest.getTitle());
        post.setContent(addPostRequest.getContent());
        post.setCreatedAt(LocalDateTime.now());

        Post savedPost = postRepository.save(post);
        return new PostDto(savedPost.getId(), savedPost.getTitle(), savedPost.getContent(), savedPost.getCreatedAt());
    }
}
