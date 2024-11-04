package com.uhm.refactoring.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "festivals")
public class Festival {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "host")
    private String host;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "poster")
    private String poster;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
