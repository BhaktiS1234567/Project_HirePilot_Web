package com.erp.HirePilot.CandidateDashboard.profile.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.erp.HirePilot.CandidateDashboard.profile.dto.BasicDetailsRequest;
import com.erp.HirePilot.CandidateDashboard.profile.dto.EducationRequest;
import com.erp.HirePilot.CandidateDashboard.profile.dto.ExperienceRequest;
import com.erp.HirePilot.CandidateDashboard.profile.dto.ExperienceResponse;
import com.erp.HirePilot.CandidateDashboard.profile.dto.ProfileResponse;
import com.erp.HirePilot.CandidateDashboard.profile.dto.ProjectRequest;
import com.erp.HirePilot.CandidateDashboard.profile.entity.CandidateProfile;
import com.erp.HirePilot.CandidateDashboard.profile.entity.Education;
import com.erp.HirePilot.CandidateDashboard.profile.entity.Experience;
import com.erp.HirePilot.CandidateDashboard.profile.entity.Project;
import com.erp.HirePilot.CandidateDashboard.profile.service.ProfileService;


@RestController
//@PreAuthorize("hasAuthority('USER')")
@RequestMapping("/candidate/Candidateprofile")
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    // Helper: accept optional header X-User-Id for development/testing when no SecurityContext
    private Long fallbackUserIdFromHeader(String header) {
        if (header == null || header.isEmpty()) return null;
        try {
            return Long.parseLong(header);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @PostMapping("/basic")
    public ResponseEntity<?> saveBasic(@RequestBody BasicDetailsRequest req,
                                       @RequestHeader(value = "X-User-Id", required = false) String uidHeader) {
        CandidateProfile saved = service.saveBasic(req, fallbackUserIdFromHeader(uidHeader));
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/basic")
    public ResponseEntity<?> deleteBasic(@RequestHeader(value = "X-User-Id", required = false) String uidHeader) {
        service.deleteBasic(fallbackUserIdFromHeader(uidHeader));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/education")
    public ResponseEntity<?> addEducation(@RequestBody EducationRequest req,
                                          @RequestHeader(value = "X-User-Id", required = false) String uidHeader) {
        Education saved = service.addEducation(req, fallbackUserIdFromHeader(uidHeader));
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/education/{id}")
    public ResponseEntity<?> deleteEducation(@PathVariable Long id,
                                             @RequestHeader(value = "X-User-Id", required = false) String uidHeader) {
        service.deleteEducation(id, fallbackUserIdFromHeader(uidHeader));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/experience")
    public ResponseEntity<?> addExperience(@RequestBody ExperienceRequest req,
                                           @RequestHeader(value = "X-User-Id", required = false) String uidHeader) {
        Experience saved = service.addExperience(req, fallbackUserIdFromHeader(uidHeader));
        ExperienceResponse resp = new ExperienceResponse(
                saved.getId(),
                saved.getCompanyName(),
                saved.getRole(),
                saved.getDuration(),
                saved.getUser().getId()
        );
        return ResponseEntity.ok(resp);
    }


    @DeleteMapping("/experience/{id}")
    public ResponseEntity<?> deleteExperience(@PathVariable Long id,
                                              @RequestHeader(value = "X-User-Id", required = false) String uidHeader) {
        service.deleteExperience(id, fallbackUserIdFromHeader(uidHeader));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/project")
    public ResponseEntity<?> addProject(@RequestBody ProjectRequest req,
                                        @RequestHeader(value = "X-User-Id", required = false) String uidHeader) {
        Project saved = service.addProject(req, fallbackUserIdFromHeader(uidHeader));
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/project/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id,
                                           @RequestHeader(value = "X-User-Id", required = false) String uidHeader) {
        service.deleteProject(id, fallbackUserIdFromHeader(uidHeader));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/resume")
    public ResponseEntity<?> saveResume(@RequestBody String resumeLink,
                                        @RequestHeader(value = "X-User-Id", required = false) String uidHeader) {
        CandidateProfile saved = service.saveResumeLink(resumeLink, fallbackUserIdFromHeader(uidHeader));
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<?> getFullProfile(@RequestHeader(value = "X-User-Id", required = false) String uidHeader) {
        ProfileResponse resp = service.getFullProfile(fallbackUserIdFromHeader(uidHeader));
        return ResponseEntity.ok(resp);
    }
}
