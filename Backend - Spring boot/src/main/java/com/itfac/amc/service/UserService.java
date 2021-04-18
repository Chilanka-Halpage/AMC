package com.itfac.amc.service;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import javax.mail.MessagingException;
import com.itfac.amc.dto.UserNameDto;
import com.itfac.amc.entity.User;
import com.itfac.amc.service.impl.UserNotFoundException;

public interface UserService {
	Optional<User> getUserById(String id);

	void deleteUser(String id);

	User addUser(User user);

	User updateUser(User user);

	public User getUser(String userId);

	UserNameDto getUserName(String userid);

	List<User> getAllUser();

	void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException;

	void updateResetPasswordToken(String token, String email) throws UserNotFoundException;

	User getByResetPasswordToken(String token);

	void updatePassword(User user, String newPassword);

}
