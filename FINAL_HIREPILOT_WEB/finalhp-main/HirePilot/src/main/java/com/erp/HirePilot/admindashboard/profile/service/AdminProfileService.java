package com.erp.HirePilot.admindashboard.profile.service;




import com.erp.HirePilot.admindashboard.profile.entity.AdminProfile;
import com.erp.HirePilot.admindashboard.profile.repo.AdminProfileRepo;
import com.erp.HirePilot.entity.User;
import com.erp.HirePilot.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminProfileService {

    private final AdminProfileRepo adminProfileRepo;
    private final UserRepo userRepo;

    // Fetch profile
    public AdminProfile getProfile(Long userId) {
        return adminProfileRepo.findByUserId(userId)
                .orElseGet(() -> {
                    // if profile doesn't exist yet, return basic info from User
                    User user = userRepo.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found"));
                    AdminProfile temp = new AdminProfile();
                    temp.setUser(user);
                    temp.setRole(null);
                    temp.setJoiningOn(null);
                    return temp;
                });
    }

    // Update or create profile
    public AdminProfile updateProfile(Long userId, String name, String role) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update user name
        user.setName(name);
        userRepo.save(user);

        // Update or create admin profile
        AdminProfile profile = adminProfileRepo.findByUserId(userId)
                .orElseGet(() -> {
                    AdminProfile newProfile = new AdminProfile();
                    newProfile.setUser(user);
                    newProfile.setJoiningOn(LocalDateTime.now());
                    return newProfile;
                });

        profile.setRole(role);
        return adminProfileRepo.save(profile);
    }
}
