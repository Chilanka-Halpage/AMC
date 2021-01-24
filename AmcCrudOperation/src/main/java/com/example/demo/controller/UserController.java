package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("User/")
public class UserController {
	
	@Autowired
	UserService userservice;
	
	@GetMapping("findAllUser")
	public List<User> getAllUser(){
		List<User> allUser = userservice.getAllUser();
		return allUser;
	}
	
	@GetMapping("findUser/{id}")
	ResponseEntity<Optional<User>> getUserById(@PathVariable("id") String userId){
		Optional<User> userById = userservice.getUserById(userId);
		if(userById!=null) {
			return ResponseEntity.ok(userById);	
			}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No category with entered id " + userId).body(userById);
	}
	
	@RequestMapping(method = RequestMethod.DELETE,value="deleteUser/{id}")
	public void deleteUser(@PathVariable("id") String userId) {
		userservice.deleteUser(userId);
	}

}
