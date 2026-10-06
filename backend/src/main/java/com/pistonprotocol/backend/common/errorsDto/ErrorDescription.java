package com.pistonprotocol.backend.common.errorsDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDescription {
    private String message;
    private int status;
    private String timestamp;
}