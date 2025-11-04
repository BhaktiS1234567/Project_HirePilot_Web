package com.erp.HirePilot.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.erp.HirePilot.dto.AuthResponseDto;
import com.erp.HirePilot.dto.LoginUserDto;
import com.erp.HirePilot.dto.RegisterUserDto;
import com.erp.HirePilot.dto.ResetPasswordDto;
import com.erp.HirePilot.entity.User;
import com.erp.HirePilot.repo.UserRepo;

@Service
public class AuthenticationService {
    private final UserRepo userRepository;
     private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    
    public AuthenticationService(
            UserRepo userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService=jwtService;
    }

    public ResponseEntity<?>  signup(RegisterUserDto input) {
        User check = userRepository.findByEmail(input.getEmail());
        
        if (check != null) {
        	 return ResponseEntity
                     .badRequest()
                     .body("User already exists with this email");
        }
        
        if (userRepository.existsByUsername(input.getUsername())) {
        	 return ResponseEntity
                     .badRequest()
                     .body("Username already taken!");
           
        }

        User user = new User();
       
        user.setName(input.getName());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
   
        user.setUsername(input.getUsername());
        user.setRole(input.getRole());
        return ResponseEntity.ok(userRepository.save(user));
    }

    public AuthResponseDto authenticate(LoginUserDto input) {
        // Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );

        // Get user details
        User user = userRepository.findByUsername(input.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate JWT token
        String token = jwtService.generateToken(user);

        // ✅ Return full user details + token
        return new AuthResponseDto(
                user.getName(),    // Name
                user.getEmail(),   // Email
                user.getRole(),    // Role
                user.getId(),
                token              // Token
        );
    }

    public User reset(ResetPasswordDto input) {
        if (input.getNewPassword() == null || input.getNewPassword().isEmpty()) {
            throw new IllegalArgumentException("New password cannot be empty");
        }

        User user = userRepository.findByEmail(input.getEmail());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        user.setPassword(passwordEncoder.encode(input.getNewPassword()));
        return userRepository.save(user);
    }



}
