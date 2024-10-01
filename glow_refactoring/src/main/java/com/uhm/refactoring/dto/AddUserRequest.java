package com.uhm.refactoring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddUserRequest {
    private String name;
    private String phone;
    private String email;
    private String password;
}
