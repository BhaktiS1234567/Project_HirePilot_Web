package com.erp.HirePilot.admindashboard.settings.databackup.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.erp.HirePilot.admindashboard.settings.databackup.service.DataBackupService;

@RestController
@RequestMapping("/admin/setting/backup")
@RequiredArgsConstructor
public class DataBackupController {

    private final DataBackupService service;

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportData() throws Exception {
        byte[] data = service.exportData();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"backup.json\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(data);
    }

    @PostMapping("/import")
    public ResponseEntity<String> importData(@RequestParam("file") MultipartFile file) throws Exception {
        String result = service.importData(file.getBytes());
        return ResponseEntity.ok(result);
    }
}
