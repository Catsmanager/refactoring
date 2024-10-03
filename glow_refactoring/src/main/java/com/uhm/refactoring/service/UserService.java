package com.uhm.refactoring.service;

import com.uhm.refactoring.dto.AddUserRequest;
import com.uhm.refactoring.dto.UserInfoDto;
import com.uhm.refactoring.entity.User;
import com.uhm.refactoring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(AddUserRequest dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalStateException("User Already Exists");
        }
        return userRepository.save(User.builder()
                .name(dto.getName())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
                .build()).getId();
    }

    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected User"));
    }

    public UserInfoDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException(String.valueOf(userId)));
        return new UserInfoDto(user.getName(), user.getEmail());
    }
}
