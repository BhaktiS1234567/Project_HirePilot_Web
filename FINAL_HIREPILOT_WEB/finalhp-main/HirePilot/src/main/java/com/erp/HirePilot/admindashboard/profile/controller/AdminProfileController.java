package com.erp.HirePilot.admindashboard.profile.controller;



import com.erp.HirePilot.admindashboard.profile.entity.AdminProfile;
import com.erp.HirePilot.admindashboard.profile.service.AdminProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminProfileController {

    private final AdminProfileService service;

    @GetMapping("/{userId}")
    public AdminProfile getProfile(@PathVariable Long userId) {
        return service.getProfile(userId);
    }

    @PutMapping("/{userId}")
    public AdminProfile updateProfile(@PathVariable Long userId,
                                      @RequestBody AdminProfile req) {
        return service.updateProfile(userId, req.getUser().getName(), req.getRole());
    }
}
