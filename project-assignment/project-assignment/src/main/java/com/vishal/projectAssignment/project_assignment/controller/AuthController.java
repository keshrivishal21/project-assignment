package com.vishal.projectAssignment.project_assignment.controller;

import com.vishal.projectAssignment.project_assignment.dto.LoginDto;
import com.vishal.projectAssignment.project_assignment.dto.LoginResponseDto;
import com.vishal.projectAssignment.project_assignment.dto.SignUpRequestDto;
import com.vishal.projectAssignment.project_assignment.dto.UserDto;
import com.vishal.projectAssignment.project_assignment.security.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @Operation(summary = "Register a new user")
    @PostMapping("/signup")
    public ResponseEntity<UserDto> signup(@Valid @RequestBody SignUpRequestDto signUpRequestDto){
        return new ResponseEntity<>(authService.signUp(signUpRequestDto), HttpStatus.CREATED);
    }

    @Operation(summary = "Login and get JWT token")
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(
            @Valid @RequestBody LoginDto loginDto
    ) {
        String token = authService.login(loginDto);
        return ResponseEntity.ok(new LoginResponseDto(token));
    }
}
