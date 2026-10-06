package com.pistonprotocol.backend.module.user.internal;

import com.pistonprotocol.backend.module.user.api.dto.LoginRequestDto;
import com.pistonprotocol.backend.module.user.api.dto.RegisterRequestDto;

public interface UserService {
    void registerUser(RegisterRequestDto request);
    void loginUser (LoginRequestDto request);
}