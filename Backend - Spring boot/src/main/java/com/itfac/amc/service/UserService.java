package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import com.itfac.amc.entity.User;

public interface UserService {

	List<User> getAllUser();

	Optional<User> getUserById(String id);

	void deleteUser(String id);

	User addUser(User user);

}
