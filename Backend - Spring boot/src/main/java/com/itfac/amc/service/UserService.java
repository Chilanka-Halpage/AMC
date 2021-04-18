package com.itfac.amc.service;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.itfac.amc.dto.UserNameDto;
import com.itfac.amc.entity.User;

public interface UserService {

	

	Optional<User> getUserById(String id);

	void deleteUser(String id);

	User addUser(User user);

	User updateUser(User user);

	//public List<User> getAllUsers();

	public User getUser(String userId);

	UserNameDto getUserName(String userid);
	
	public ResponseEntity<String> updateUser(String userId,User user);

	public ResponseEntity<String> updatePassword(String userId,User user);
	
	
	//Page<User> getAllUser(Pageable pageable);

	List<User> getAllUser();

}
