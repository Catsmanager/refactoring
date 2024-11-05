package com.uhm.refactoring.controller;

import com.uhm.refactoring.dto.AddUserRequest;
import com.uhm.refactoring.dto.LoginRequest;
import com.uhm.refactoring.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class UserController {

    @Autowired
    private final UserService userService;

    @PostMapping("/signup")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> signup(@RequestBody AddUserRequest request) {
        userService.save(request);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Signup Successful");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
