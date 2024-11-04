package com.uhm.refactoring.service;

import com.uhm.refactoring.dto.AddPostRequest;
import com.uhm.refactoring.dto.FestivalDto;
import com.uhm.refactoring.entity.Festival;
import com.uhm.refactoring.entity.Post;
import com.uhm.refactoring.repository.FestivalRepository;
import com.uhm.refactoring.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FestivalService {
    private final FestivalRepository festivalRepository;
    private final PostRepository postRepository;

    @Autowired
    public FestivalService(FestivalRepository festivalRepository, PostRepository postRepository) {
        this.festivalRepository = festivalRepository;
        this.postRepository = postRepository;
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
}
