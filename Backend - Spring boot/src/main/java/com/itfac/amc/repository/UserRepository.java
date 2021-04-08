package com.itfac.amc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.itfac.amc.entity.User;
import com.itfac.amc.reportData.UserDetails;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
	User findByUserId(String userId);

	User save(List<User> user);
	
	@Query(value = "select user_id,uname,role,active,email,conatact_no from user" , nativeQuery = true)
	List<UserDetails> getUserDetails();
}
