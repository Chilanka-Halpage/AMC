package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.User;

public interface UserService {

	List<User> getAllUser();

	Optional<User> getUserById(String id);

	void deleteUser(String id);

}
