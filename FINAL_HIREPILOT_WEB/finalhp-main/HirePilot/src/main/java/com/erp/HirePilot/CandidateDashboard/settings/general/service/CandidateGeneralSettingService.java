package com.erp.HirePilot.CandidateDashboard.settings.general.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.HirePilot.CandidateDashboard.profile.entity.CandidateProfile;
import com.erp.HirePilot.CandidateDashboard.profile.repo.CandidateProfileRepo;
import com.erp.HirePilot.CandidateDashboard.settings.general.repo.CandidateProfileRepository;

import jakarta.transaction.Transactional;

@Service
public class CandidateGeneralSettingService {

    @Autowired
    private CandidateProfileRepository profileRepo;

    @Transactional
    public CandidateProfile updateEmail(Long userId, String email) {
        CandidateProfile profile = profileRepo.findByUserId(userId).orElse(null);

        if (profile == null) {
            return null;
        }

        // Update email in CandidateProfile
        profile.setEmail(email);

        // Optional: Update in User Entity also (if linked)
        if (profile.getUser() != null) {
            profile.getUser().setEmail(email);
        }

        return profileRepo.save(profile);
    }

    @Transactional
    public boolean updateMobile(Long userId, String mobileNumber) {
        CandidateProfile profile = profileRepo.findByUserId(userId).orElse(null);

        if (profile == null) {
            return false;
        }

        profile.setMobile(mobileNumber);
        profileRepo.save(profile);
        return true;
    }

}
