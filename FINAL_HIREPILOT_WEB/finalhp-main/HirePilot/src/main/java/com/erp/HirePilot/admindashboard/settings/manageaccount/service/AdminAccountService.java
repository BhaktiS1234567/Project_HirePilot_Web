package com.erp.HirePilot.admindashboard.settings.manageaccount.service;


import com.erp.HirePilot.admindashboard.settings.manageaccount.dto.AdminAccountResponse;
import com.erp.HirePilot.admindashboard.settings.sitesetting.dto.AdminAccountRequest;

import com.erp.HirePilot.admindashboard.settings.sitesetting.entity.AdminAccount;
import com.erp.HirePilot.admindashboard.settings.sitesetting.repo.AdminAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminAccountService {

    private final AdminAccountRepository repository;

    public List<AdminAccountResponse> getAllAdmins(Long userId) {
        return repository.findByCreatedByUserId(userId).stream()
                .map(a -> {
                    AdminAccountResponse res = new AdminAccountResponse();
                    res.setId(a.getId());
                    res.setAdminName(a.getAdminName());
                    res.setAdminEmail(a.getAdminEmail());
                    return res;
                }).collect(Collectors.toList());
    }

    public AdminAccountResponse addAdmin(AdminAccountRequest request, Long userId) {
        AdminAccount admin = new AdminAccount();
        admin.setAdminName(request.getAdminName());
        admin.setAdminEmail(request.getAdminEmail());
        admin.setCreatedByUserId(userId);
        admin = repository.save(admin);

        AdminAccountResponse res = new AdminAccountResponse();
        res.setId(admin.getId());
        res.setAdminName(admin.getAdminName());
        res.setAdminEmail(admin.getAdminEmail());
        return res;
    }

    public void deleteAdmin(Long adminId) {
        repository.deleteById(adminId);
    }
}
