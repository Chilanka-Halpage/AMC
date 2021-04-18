package com.itfac.amc.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.itfac.amc.dto.UserNameDto;
import com.itfac.amc.entity.User;
import com.itfac.amc.repository.UserRepository;
import com.itfac.amc.service.UserService;

@Service
public class UserServiceImp implements UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder encoder;

	@Override
	public List<User> getAllUser() {
		List<User> findAlluser = userRepository.findAll();
		return findAlluser;
	}

	@Override
	public Optional<User> getUserById(String id) {
		Optional<User> finduserById = userRepository.findById(id);
		return finduserById;
	}

	@Override
	public void deleteUser(String id) {
		userRepository.deleteById(id);
	}

	@Override

	public User addUser(User user) {
		user.setUserId((userRepository.getUserLastNo()) + randomString());
		user.setPassword(encoder.encode(user.getPassword()));
		return userRepository.save(user);

	}

	private int start() {
		int a = 1000;
		return a;
	}

	private String randomString() {
		int leftLimit = 97; // letter 'a'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 1;
		Random random = new Random();

		String generatedString = random.ints(leftLimit, rightLimit + 1).limit(targetStringLength)
				.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();

		return generatedString;
	}

	public String ranString() {
		return (start() + randomString());
	}

	@Override
	public User updateUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public User getUser(String userId) {
		return userRepository.findByUserId(userId);
	}

	/* get user name to dashboard */
	@Override
	public UserNameDto getUserName(String userid) {
		UserNameDto Uname = userRepository.findUsernameByUserId(userid);
		return Uname;
	}
	
	//update user's contact no and email
	@Override
	public ResponseEntity<String> updateUser(String userId,User user) {
		User resultUser = getUser(userId);
		resultUser.setContactNo(user.getContactNo());
		resultUser.setEmail(user.getEmail());
		userRepository.save(resultUser);
		return ResponseEntity.status(HttpStatus.OK).body("Modified Successfully");
	}
	
	//update user's password
	@Override
	public ResponseEntity<String> updatePassword(String userId,User user) {
		User resultUser = getUser(userId);
		resultUser.setPassword(encoder.encode(user.getPassword()));
		userRepository.save(resultUser);
		return ResponseEntity.status(HttpStatus.OK).body("Modified Successfully");
	}

}
