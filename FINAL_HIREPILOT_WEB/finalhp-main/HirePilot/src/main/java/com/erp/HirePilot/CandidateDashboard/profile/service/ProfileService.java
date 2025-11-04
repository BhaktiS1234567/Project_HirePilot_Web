package com.erp.HirePilot.CandidateDashboard.profile.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.erp.HirePilot.CandidateDashboard.profile.dto.BasicDetailsRequest;
import com.erp.HirePilot.CandidateDashboard.profile.dto.EducationRequest;
import com.erp.HirePilot.CandidateDashboard.profile.dto.ExperienceRequest;
import com.erp.HirePilot.CandidateDashboard.profile.dto.ProfileResponse;
import com.erp.HirePilot.CandidateDashboard.profile.dto.ProjectRequest;
import com.erp.HirePilot.CandidateDashboard.profile.entity.CandidateProfile;
import com.erp.HirePilot.CandidateDashboard.profile.entity.Education;
import com.erp.HirePilot.CandidateDashboard.profile.entity.Experience;
import com.erp.HirePilot.CandidateDashboard.profile.entity.Project;
import com.erp.HirePilot.CandidateDashboard.profile.repo.CandidateProfileRepo;
import com.erp.HirePilot.CandidateDashboard.profile.repo.EducationRepo;
import com.erp.HirePilot.CandidateDashboard.profile.repo.ExperienceRepo;
import com.erp.HirePilot.CandidateDashboard.profile.repo.ProjectRepo;
import com.erp.HirePilot.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfileService {

    private final CandidateProfileRepo profileRepo;
    private final EducationRepo educationRepo;
    private final ExperienceRepo experienceRepo;
    private final ProjectRepo projectRepo;
    private final ProfileHelper helper;

    public ProfileService(CandidateProfileRepo profileRepo,
                          EducationRepo educationRepo,
                          ExperienceRepo experienceRepo,
                          ProjectRepo projectRepo,
                          ProfileHelper helper) {
        this.profileRepo = profileRepo;
        this.educationRepo = educationRepo;
        this.experienceRepo = experienceRepo;
        this.projectRepo = projectRepo;
        this.helper = helper;
    }

    @Transactional
    public CandidateProfile saveBasic(BasicDetailsRequest req, Long fallbackUserId) {
        User user = helper.getCurrentUser(fallbackUserId);
        CandidateProfile profile = profileRepo.findByUser(user).orElseGet(CandidateProfile::new);
        profile.setUser(user);
        profile.setFullName(req.getFullName());
        profile.setDob(req.getDob());
        profile.setGender(req.getGender());
        profile.setEmail(req.getEmail());
        profile.setMobile(req.getMobile());
        if (req.getResumeLink() != null) profile.setResumeLink(req.getResumeLink());
        return profileRepo.save(profile);
    }

    @Transactional
    public void deleteBasic(Long fallbackUserId) {
        User user = helper.getCurrentUser(fallbackUserId);
        profileRepo.findByUser(user).ifPresent(profileRepo::delete);
    }

    @Transactional
    public Education addEducation(EducationRequest req, Long fallbackUserId) {
        User user = helper.getCurrentUser(fallbackUserId);
        Education edu = req.getId() != null ? educationRepo.findById(req.getId()).orElse(new Education()) : new Education();
        edu.setCollegeName(req.getCollegeName());
        edu.setDegree(req.getDegree());
        edu.setUniversity(req.getUniversity());
        edu.setPassingYear(req.getPassingYear());
        edu.setCgpa(req.getCgpa());
        edu.setUser(user);
        return educationRepo.save(edu);
    }

    @Transactional
    public void deleteEducation(Long id, Long fallbackUserId) {
        helper.getCurrentUser(fallbackUserId); // ensure user found
        educationRepo.findById(id).ifPresent(educationRepo::delete);
    }

    @Transactional
    public Experience addExperience(ExperienceRequest req, Long fallbackUserId) {
        User user = helper.getCurrentUser(fallbackUserId);
        Experience exp = req.getId() != null ? experienceRepo.findById(req.getId()).orElse(new Experience()) : new Experience();
        exp.setCompanyName(req.getCompanyName());
        exp.setRole(req.getRole());
        exp.setDuration(req.getDuration());
        exp.setUser(user);
        return experienceRepo.save(exp);
    }

    @Transactional
    public void deleteExperience(Long id, Long fallbackUserId) {
        helper.getCurrentUser(fallbackUserId);
        experienceRepo.findById(id).ifPresent(experienceRepo::delete);
    }

    @Transactional
    public Project addProject(ProjectRequest req, Long fallbackUserId) {
        User user = helper.getCurrentUser(fallbackUserId);
        Project project = req.getId() != null ? projectRepo.findById(req.getId()).orElse(new Project()) : new Project();
        project.setProjectTitle(req.getProjectTitle());
        project.setDescription(req.getDescription());
        project.setUser(user);
        return projectRepo.save(project);
    }

    @Transactional
    public void deleteProject(Long id, Long fallbackUserId) {
        helper.getCurrentUser(fallbackUserId);
        projectRepo.findById(id).ifPresent(projectRepo::delete);
    }

    @Transactional(readOnly = true)
    public ProfileResponse getFullProfile(Long fallbackUserId) {
        User user = helper.getCurrentUser(fallbackUserId);

        ProfileResponse resp = new ProfileResponse();

        CandidateProfile cp = profileRepo.findByUser(user).orElse(null);
        BasicDetailsRequest basic = null;
        if (cp != null) {
            basic = new BasicDetailsRequest();
            basic.setFullName(cp.getFullName());
            basic.setDob(cp.getDob());
            basic.setGender(cp.getGender());
            basic.setEmail(cp.getEmail());
            basic.setMobile(cp.getMobile());
            basic.setResumeLink(cp.getResumeLink());
        }
        resp.setBasicDetails(basic);

        List<EducationRequest> ed = educationRepo.findByUser(user).stream().map(e -> {
            EducationRequest r = new EducationRequest();
            r.setId(e.getId());
            r.setCollegeName(e.getCollegeName());
            r.setDegree(e.getDegree());
            r.setUniversity(e.getUniversity());
            r.setPassingYear(e.getPassingYear());
            r.setCgpa(e.getCgpa());
            return r;
        }).collect(Collectors.toList());
        resp.setEducation(ed);

        List<ExperienceRequest> ex = experienceRepo.findByUser(user).stream().map(e -> {
            ExperienceRequest r = new ExperienceRequest();
            r.setId(e.getId());
            r.setCompanyName(e.getCompanyName());
            r.setRole(e.getRole());
            r.setDuration(e.getDuration());
            return r;
        }).collect(Collectors.toList());
        resp.setExperience(ex);

        List<ProjectRequest> pr = projectRepo.findByUser(user).stream().map(p -> {
            ProjectRequest r = new ProjectRequest();
            r.setId(p.getId());
            r.setProjectTitle(p.getProjectTitle());
            r.setDescription(p.getDescription());
            return r;
        }).collect(Collectors.toList());
        resp.setProjects(pr);

        return resp;
    }

    @Transactional
    public CandidateProfile saveResumeLink(String resumeLink, Long fallbackUserId) {
        User user = helper.getCurrentUser(fallbackUserId);
        CandidateProfile profile = profileRepo.findByUser(user).orElseGet(CandidateProfile::new);
        profile.setUser(user);
        profile.setResumeLink(resumeLink);
        return profileRepo.save(profile);
    }
}
