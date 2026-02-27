package com.vishal.projectAssignment.project_assignment.security;



import com.vishal.projectAssignment.project_assignment.dto.LoginDto;
import com.vishal.projectAssignment.project_assignment.dto.SignUpRequestDto;
import com.vishal.projectAssignment.project_assignment.dto.UserDto;
import com.vishal.projectAssignment.project_assignment.entity.User;
import com.vishal.projectAssignment.project_assignment.entity.enums.Role;
import com.vishal.projectAssignment.project_assignment.exception.BadRequestException;
import com.vishal.projectAssignment.project_assignment.exception.UnauthorizedException;
import com.vishal.projectAssignment.project_assignment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public UserDto signUp(SignUpRequestDto signUpRequestDto) {

        User user = userRepository.findByEmail(signUpRequestDto.getEmail()).orElse(null);

        if (user != null) {
            throw new BadRequestException("Email already exists");
        }

        User newUser = modelMapper.map(signUpRequestDto, User.class);
        newUser.setRole(Role.USER);
        newUser.setPassword(passwordEncoder.encode(signUpRequestDto.getPassword()));
        newUser = userRepository.save(newUser);

        return modelMapper.map(newUser, UserDto.class);
    }

    public String login(LoginDto loginDto) {

        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }
        return jwtService.generateAccessToken(user);
    }
    
}
