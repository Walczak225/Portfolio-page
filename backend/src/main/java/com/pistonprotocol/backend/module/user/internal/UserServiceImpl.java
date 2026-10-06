package com.pistonprotocol.backend.module.user.internal;

import com.pistonprotocol.backend.common.exception.ConflictException;
import com.pistonprotocol.backend.module.user.api.dto.LoginRequestDto;
import com.pistonprotocol.backend.module.user.api.dto.RegisterRequestDto;
import com.pistonprotocol.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public void registerUser(RegisterRequestDto request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ConflictException("User already exists");
        }

        User user = User.builder()
                .name(request.name())
                .surname(request.surname())
                .nickname(request.nickname())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .build();

        userRepository.save(user);
    }

    @Override
    public String loginUser(LoginRequestDto request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Incorrect email or  password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Incorrect email or  password");
        }

        return jwtService.generateToken(user.getEmail());
    }
}