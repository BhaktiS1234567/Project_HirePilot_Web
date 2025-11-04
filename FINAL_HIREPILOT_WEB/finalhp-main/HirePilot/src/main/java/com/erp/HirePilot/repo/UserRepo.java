package com.erp.HirePilot.repo;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import com.erp.HirePilot.entity.User;



@Repository
public interface UserRepo extends JpaRepository <User, String> {

	Optional<User> findByUsername(String username);
	            

	User findByEmail(String email);
	long countByRoleIgnoreCase(String role);

	boolean existsByUsername(String username);


	Optional<User> findById(Long fallbackUserId);

	List<User> findByRoleIgnoreCase(String role);
    
	@Transactional
    void deleteByEmail(String email);

	
	
}
