package com.itfac.amc.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
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

	public User addUser(User user) {
		
		String Password= "1234@abc";
		String userId=genarateUserId();
        user.setUserId(userId);
		user.setPassword(encoder.encode(Password));
		String Email=user.getEmail();
		String UserId=user.getUserId();
		
		try {
			sentPasswordAndUserId(Password,Email,UserId);
		} catch (UnsupportedEncodingException e) {
			System.out.println(e);
			e.printStackTrace();
		} catch (MessagingException e) {
			System.out.println(e);
			e.printStackTrace();
		}
		return userRepository.save(user);

	}
	
	public String genarateUserId() {
		return userRepository.getUserLastNo()+randomString();
	}
	
	public void sentPasswordAndUserId(String Password,String Email,String UserId)throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();              
        MimeMessageHelper helper = new MimeMessageHelper(message);
         
        helper.setFrom("amcrevenu@gmail.com", "AMC_EpicLanka");
        helper.setTo(Email);
         
        String subject = "Here your Password and User Id";
         
        String content = "<p>Hello,</p>"
                + "<p>Welcome to the Annual Maintanance contract Revenue System</p>"
                + "<p>Login to the system use this password and User Id</p>"
                + "<p>User Id: "+UserId+"</p>"
                + "<p>Password: "+Password+"</p>"
                + "<p>After first login you can change your Password using Forgot Password Link </p>"
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
	public User getUser(String userId) {
		return userRepository.findByUserId(userId);
	}

	/* get user name to dashboard */
	@Override
	public UserNameDto getUserName(String userid) {
		UserNameDto Uname = userRepository.findUsernameByUserId(userid);
		return Uname;
	}
	
	@Override
	public void sendEmail(String recipientEmail, String link)
            throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();              
        MimeMessageHelper helper = new MimeMessageHelper(message);
         
        helper.setFrom("amcrevenu@gmail.com", "AMC_EpicLanka");
        helper.setTo(recipientEmail);
         
        String subject = "Here's the link to reset your password";
         
        String content = "<p>Hello,</p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><a href=\"" + link + "\">Change my password</a></p>"
                + "<br>"
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
	            user.setResetPasswordToken(token);
	            userRepository.save(user);
	        } else {
	            throw new UserNotFoundException();
	        }
	    }
	     
	   @Override
	    public User getByResetPasswordToken(String token) {
	        return userRepository.findByResetPasswordToken(token);
	    }
	   
	   @Override
	    public void updatePassword(User user, String newPassword) {
	        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	        String encodedPassword = passwordEncoder.encode(newPassword);
	        user.setPassword(encodedPassword);
	         
	        user.setResetPasswordToken(null);
	        userRepository.save(user);
	    }


	

}
