package com.pistonprotocol.backend.module.user.api.dto;

public record LoginRequestDto(
        String email,
        String password
) {}