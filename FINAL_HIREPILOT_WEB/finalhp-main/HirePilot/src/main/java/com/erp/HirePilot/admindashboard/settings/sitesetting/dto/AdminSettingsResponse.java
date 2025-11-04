package com.erp.HirePilot.admindashboard.settings.sitesetting.dto;


import com.erp.HirePilot.admindashboard.settings.sitesetting.entity.AdminSettings;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminSettingsResponse {
    private boolean firstTime;
    private AdminSettings settings;
}

