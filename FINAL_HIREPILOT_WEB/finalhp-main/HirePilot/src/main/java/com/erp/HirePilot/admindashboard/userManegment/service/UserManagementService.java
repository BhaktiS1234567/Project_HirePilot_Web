package com.erp.HirePilot.admindashboard.userManegment.service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.erp.HirePilot.admindashboard.userManegment.dto.UserResponse;
import com.erp.HirePilot.entity.User;
import com.erp.HirePilot.repo.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserManagementService {

    private final UserRepo userRepo;

    // Fetch all users with role 'USER'
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepo. findByRoleIgnoreCase("USER");
        return users.stream()
                .map(u -> new UserResponse(u.getName(), u.getEmail(), u.getRole()))
                .collect(Collectors.toList());
    }

    @Transactional
    public String deleteUserByEmail(String email) {
        User user = userRepo.findByEmail(email);
        if (user != null) {
            userRepo.deleteByEmail(email);
            return "User with email " + email + " deleted successfully.";
        } else {
            return "User not found with email: " + email;
        }
    }
}

