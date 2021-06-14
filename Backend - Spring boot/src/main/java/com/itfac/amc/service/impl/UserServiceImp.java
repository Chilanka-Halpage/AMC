package com.itfac.amc.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.UserNotFoundException;

import com.itfac.amc.dto.UserNameDto;
import com.itfac.amc.entity.User;
import com.itfac.amc.repository.UserRepository;
import com.itfac.amc.service.UserService;

@Service
public class UserServiceImp implements UserService {

	//-----------------------------------------------
	private static BCryptPasswordEncoder passwordEcorder = new BCryptPasswordEncoder();
	
	@Autowired
	UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder encoder;

	@Autowired
	private JavaMailSender mailSender;

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
	public User addUser(User user,HttpServletRequest httpServletRequest) {
		
		String uName = user.getUname().toLowerCase();
		String userId = genarateUserId();
		String Password=uName+"@"+userId;
		user.setUserId(userId);
		user.setPassword(encoder.encode(Password));
		String Email = user.getEmail();
		String UserId = user.getUserId();
		try {
			sentPasswordAndUserId(Password, Email, UserId);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		String ipAddress = httpServletRequest.getRemoteAddr();
		user.setSavedIp(ipAddress);
		return userRepository.save(user);

	}

	public String genarateUserId() {
		return userRepository.getUserLastNo() + randomString();
	}

	public void sentPasswordAndUserId(String Password, String Email, String UserId)
			throws MessagingException, UnsupportedEncodingException {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setFrom("amcrevenu@gmail.com", "AMC_EpicLanka");
		helper.setTo(Email);

		String subject = "Here your Password and User Id";

		String content = "<p>Hello,</p>" + "<p>Welcome to the Annual Maintanance contract Revenue System</p>"
				+ "<p>Login to the system use this password and User Id</p>" + "<p>User Id: " + UserId + "</p>"
				+ "<p>Password: " + Password + "</p>"
				+ "<p>it's better change your password after first login</p>"
				+ "<p>Happy journey with AMC</p>";

		helper.setSubject(subject);

		helper.setText(content, true);

		mailSender.send(message);
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
		  return generatedString.toUpperCase();
	}

	public String ranString() {
		return (start() + randomString());
	}

	@Override
	public void updateUser(User user, String userId) {
		 User userr=userRepository.findByUserId(userId);
		 userr.setRole(user.getRole());
		 userr.setActive(user.isActive());
		 userRepository.save(userr);
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
	public Boolean updatePassword(String current_password,String userId,User user) {
		User resultUser = getUser(userId);
		//String current_p=user.getUser(current_password);
		Boolean doPasswordsMatch = doPasswordsMatch(current_password, resultUser.getPassword());
		if(doPasswordsMatch==true) {
			String encodedPassword = encoder.encode(user.getPassword());
			resultUser.setPassword(encodedPassword);
			userRepository.save(resultUser);
			return true;
		}
		else {
			return false;
		}
	}
	
	   public Boolean doPasswordsMatch(String current_password,String encodedPassword) {
	      return passwordEcorder.matches(current_password, encodedPassword);
	   }

	@Override
	public void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setFrom("amcrevenu@gmail.com", "AMC_EpicLanka");
		helper.setTo(recipientEmail);

		String subject = "Here's the link to reset your password";

		String content = "<p>Hello,</p>" + "<p>You have requested to reset your password.</p>"
				+ "<p>Click the link below to change your password:</p>" + "<p><a href=\"" + link
				+ "\">Change my password</a></p>" 
				+ "<p>Ignore this email if you do remember your password, "
				+ "or you have not made the request.</p>";

		helper.setSubject(subject);

		helper.setText(content, true);

		mailSender.send(message);
	}

	@Override
	public void updateResetPasswordToken(String token, String email) throws UserNotFoundException {

		User user = userRepository.findByEmail(email);
		if (user != null) {
			userRepository.updateResetToken(token, email);
		} else {
			throw new UserNotFoundException("Invalid email !");
		}
	}
	@Override
	public User getByUserName(User user) {
		return userRepository.findByUname(user.getUname());
	}

	@Override
	public User getByResetPasswordToken(String token) {
		return userRepository.findByResetPasswordToken(token);
	}

	@Override
	public void updatePassword(User user, String newPassword) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode(newPassword);
		String userId=user.getUserId();
		userRepository.updatePassword(encodedPassword, userId);
		
	}

}
