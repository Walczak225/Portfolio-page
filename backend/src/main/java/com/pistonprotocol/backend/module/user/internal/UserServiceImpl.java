package com.pistonprotocol.backend.module.user.internal;

import com.pistonprotocol.backend.common.exception.ConflictException;
import com.pistonprotocol.backend.module.user.api.dto.LoginRequestDto;
import com.pistonprotocol.backend.module.user.api.dto.RegisterRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void registerUser(RegisterRequestDto request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new ConflictException("This user already exists!");
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
    public void loginUser(LoginRequestDto request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow( () ->new RuntimeException("Email or password invalid!"));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Passwords don't match!");
        }

    }
}