package com.itfac.amc.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.dto.UserNameDto;
import com.itfac.amc.entity.User;
import com.itfac.amc.reportData.viewLoginDetails;
import com.itfac.amc.repository.UserRepository;
import com.itfac.amc.service.LoginDetailsService;
import com.itfac.amc.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("User/")
public class UserController {

	@Autowired
	UserService userservice;

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	LoginDetailsService loginDetailsService;

	@GetMapping("findAllUser")
	public List<User> getAllUser() {
		List<User> allUser = userservice.getAllUser();
		return allUser;
	}

	@GetMapping("findUser/{id}")
	ResponseEntity<Optional<User>> getUserById(@PathVariable("id") String userId) {
		Optional<User> userById = userservice.getUserById(userId);
		if (userById != null) {
			return ResponseEntity.ok(userById);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No user with entered id " + userId)
				.body(userById);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "deleteUser/{id}")
	public void deleteUser(@PathVariable("id") String userId) {
		userservice.deleteUser(userId);
	}

	@PostMapping("AddUser")
	User addUser(@Validated @RequestBody User user) {
		return userservice.addUser(user);
	}

	@PutMapping("updateUser/{id}")
	User updateUser(@Validated @RequestBody User user) {
		return userservice.updateUser(user);
	}

	//get user details
	@GetMapping("/allusers/{userId}")
	ResponseEntity<User> getUser(@PathVariable("userId") String userId) {
		User user = userService.getUser(userId);
		if (user != null) {
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No User with name " + userId).body(user);
	}

	// update users email and password
	@PutMapping(path = "/update/{id}")
	public ResponseEntity<String> updateUser(@PathVariable(value = "id") String userId, @RequestBody User user) {
		User resultUser = userService.getUser(userId);
		resultUser.setContactNo(user.getContactNo());
		resultUser.setEmail(user.getEmail());
		userRepository.save(resultUser);
		return ResponseEntity.status(HttpStatus.OK).body("Modified Successfully");
	}

	// update password
	@PutMapping(path = "/updatePassword/{id}")
	public ResponseEntity<String> updatePassword(@PathVariable(value = "id") String userId, @RequestBody User user) {
		User resultUser = userService.getUser(userId);
		resultUser.setPassword(user.getPassword());
		userRepository.save(resultUser);
		return ResponseEntity.status(HttpStatus.OK).body("Modified Successfully");
	}

	// get login details
	@GetMapping("/loginDetails")
	public List<viewLoginDetails> LoginDetail() {
		return loginDetailsService.loginDetails();
	}

	//get user name to dashboard---------------------
	@GetMapping("getUname/{idname}")
	UserNameDto getUsername(@PathVariable("idname") String userid) {
		UserNameDto Uname = userService.getUserName(userid);
		return Uname;

	}

}
