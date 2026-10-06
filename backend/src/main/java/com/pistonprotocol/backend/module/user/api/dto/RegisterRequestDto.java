package com.pistonprotocol.backend.module.user.api.dto;

public record RegisterRequestDto(
        String name,
        String surname,
        String nickname,
        String email,
        String password
) {}