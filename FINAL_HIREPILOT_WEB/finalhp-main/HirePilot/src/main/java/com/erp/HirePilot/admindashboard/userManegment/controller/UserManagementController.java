package com.erp.HirePilot.admindashboard.userManegment.controller;



import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erp.HirePilot.admindashboard.userManegment.dto.UserResponse;
import com.erp.HirePilot.admindashboard.userManegment.service.UserManagementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserManagementController {

    private final UserManagementService userManagementService;

    // ✅ Fetch all users (role = USER)
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userManagementService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // ❌ Delete user by email
    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteUser(@PathVariable String email) {
        String message = userManagementService.deleteUserByEmail(email);
        return ResponseEntity.ok(message);
    }
}
