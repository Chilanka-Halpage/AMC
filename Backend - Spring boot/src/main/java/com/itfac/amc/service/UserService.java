package com.itfac.amc.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;

import com.itfac.amc.Exception.UserNotFoundException;
import com.itfac.amc.dto.UserNameDto;
import com.itfac.amc.entity.User;


public interface UserService {
	Optional<User> getUserById(String id);

	void deleteUser(String id);

	public User getUser(String userId);

	UserNameDto getUserName(String userid);

	public ResponseEntity<String> updateUser(String userId, User user);

	public Boolean updatePassword(String current_password,String userId, User user);

	List<User> getAllUser();

	void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException;

	void updateResetPasswordToken(String token, String email) throws UserNotFoundException;

	User getByResetPasswordToken(String token);

	void updatePassword(User user, String newPassword);

	User getByUserName(User user);

	void updateUser(User user, String userId);

	User addUser(User user, HttpServletRequest httpServletRequest);

}
