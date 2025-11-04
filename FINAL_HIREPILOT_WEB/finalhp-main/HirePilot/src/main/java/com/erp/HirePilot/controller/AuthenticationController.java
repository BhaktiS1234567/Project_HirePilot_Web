package com.erp.HirePilot.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.erp.HirePilot.dto.AuthResponseDto;
import com.erp.HirePilot.dto.LoginResponse;
import com.erp.HirePilot.dto.LoginUserDto;
import com.erp.HirePilot.dto.RegisterUserDto;
import com.erp.HirePilot.dto.ResetPasswordDto;
import com.erp.HirePilot.entity.User;
import com.erp.HirePilot.repo.UserRepo;
import com.erp.HirePilot.service.AuthenticationService;
import com.erp.HirePilot.service.JwtService;


@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final JwtService jwtService;
    

    private final AuthenticationService authenticationService;

    private final UserRepo userRepository;
    

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, UserRepo userRepository) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterUserDto registerUserDto) {
        Object registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> authenticate(@RequestBody LoginUserDto input) {
    	AuthResponseDto response = authenticationService.authenticate(input);
        return ResponseEntity.ok(response);
    }

    // ========================= PASSWORD RESET ============================
    @PutMapping("/forgotPass")
    public ResponseEntity<User> resetPass(@RequestBody ResetPasswordDto resetPasswordDto) {

       
    	
    	User updateUser = authenticationService.reset(resetPasswordDto);

        return ResponseEntity.ok(updateUser);
    }
    }



	

