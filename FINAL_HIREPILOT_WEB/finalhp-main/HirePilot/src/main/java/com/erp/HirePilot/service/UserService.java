package com.erp.HirePilot.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.erp.HirePilot.entity.User;
import com.erp.HirePilot.repo.UserRepo;

@Service
public class UserService {

    private final UserRepo userRepository;

    public UserService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }
    
    

}
