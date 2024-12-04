package com.uhm.refactoring.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final ObjectMapper objectMapper;

    public LoginSuccessHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        //SecurityContextHolder에 인증 정보를 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);
        log.info("로그인 성공, Email : {}", userDetails.getUsername());
        log.info("Authentication object : {}", authentication);
        log.info("Authorities : {}", authentication.getAuthorities());

        // JSON 응답을 작성하기 위해 Map 사용
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("status", "success");
        responseData.put("message", "login successful");
        responseData.put("username", userDetails.getUsername());

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // JSON 형식으로 변환하여 응답에 쓰기
        String responseJson = objectMapper.writeValueAsString(responseData);
        response.getWriter().write(responseJson);
        response.flushBuffer();
    }
}
