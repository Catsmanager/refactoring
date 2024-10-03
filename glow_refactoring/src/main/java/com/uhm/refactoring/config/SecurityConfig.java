package com.uhm.refactoring.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uhm.refactoring.handler.LoginFailureHandler;
import com.uhm.refactoring.handler.LoginSuccessHandler;
import com.uhm.refactoring.service.UserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    @Autowired
    private final UserDetailService userDetailService;
    private final ObjectMapper objectMapper;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .addFilterAfter(jsonUserAuthenticationFilter(), LogoutFilter.class)
                .authorizeHttpRequests((authorize) -> authorize
                        //.requestMatchers("/signup", "/", "/login").permitAll()
                        //.anyRequest().authenticated())
                        .anyRequest().permitAll()) //포스트맨 쓸 때
                .logout((logout) -> logout
                        .invalidateHttpSession(true)
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login"))
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() throws Exception {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();

        daoAuthenticationProvider.setUserDetailsService(userDetailService);
        daoAuthenticationProvider.setPasswordEncoder(bCryptPasswordEncoder());

        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        DaoAuthenticationProvider provider = daoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder());
        return new ProviderManager(provider);
    }

    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler();
    }

    @Bean
    public LoginFailureHandler loginFailureHandler() {
        return new LoginFailureHandler();
    }

    @Bean
    public JsonUserAuthenticationFilter jsonUserAuthenticationFilter() throws Exception {
        JsonUserAuthenticationFilter jsonUserAuthenticationFilter = new JsonUserAuthenticationFilter(objectMapper);
        jsonUserAuthenticationFilter.setAuthenticationManager(authenticationManager());
        jsonUserAuthenticationFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
        jsonUserAuthenticationFilter.setAuthenticationFailureHandler(loginFailureHandler());
        return jsonUserAuthenticationFilter;
    }
}
