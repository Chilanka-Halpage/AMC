package com.itfac.amc.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.mail.MessagingException;

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
import com.itfac.amc.service.impl.UserNotFoundException;

import net.bytebuddy.utility.RandomString;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("User/")
public class UserController {

	@Autowired
	UserService userservice;

	@Autowired
	private UserService userService;

	@Autowired
	LoginDetailsService loginDetailsService;

	@GetMapping("admin/findAllUser")
	public List<User> getAllUser() {
		List<User> allUser = userservice.getAllUser();
		return allUser;
		
		
	}

	@GetMapping("admin/findUser/{id}")
	ResponseEntity<Optional<User>> getUserById(@PathVariable("id") String userId) {
		Optional<User> userById = userservice.getUserById(userId);
		if (userById != null) {
			return ResponseEntity.ok(userById);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No user with entered id " + userId)
				.body(userById);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "admin/deleteUser/{id}")
	public void deleteUser(@PathVariable("id") String userId) {
		userservice.deleteUser(userId);
	}

	@PostMapping("admin/AddUser")
	User addUser(@Validated @RequestBody User user) {
		return userservice.addUser(user);
	}

	@PutMapping("admin/updateUser/{id}")
	User updateUsers(@PathVariable("id") String userId,@RequestBody User user) {
		user.setUserId(userId);
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
	
	// update user's password
	@PutMapping(path = "/updatePassword/{id}")
	public ResponseEntity<String> updatePassword(@PathVariable(value = "id") String userId, @RequestBody User user) {
		return userservice.updatePassword(userId, user);
	}

	// update User's email and contact No 
	@PutMapping(path = "/update/{id}")
	public ResponseEntity<String> updateUser(@PathVariable(value = "id") String userId, @RequestBody User user) {
		return userservice.updateUser(userId, user);
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
	@PostMapping("forgot_password")
	ResponseEntity <String> processForgotPassword(@RequestBody Map<String,Object> mail) {
        String email = (String) mail.get("email");
        String token = RandomString.make(30);
   
        try {
        	userservice.updateResetPasswordToken(token, email);
            String resetPasswordLink ="http://localhost:4200/ResetPassword?token=" + token;
            userservice.sendEmail(email, resetPasswordLink);
            return ResponseEntity.status(HttpStatus.OK).body("check email");
             
        } catch (UserNotFoundException ex) {
        	return ResponseEntity.badRequest().body("invalid email");
        } 
        catch (UnsupportedEncodingException | MessagingException e) {
           
        }
          return null;   
        
    }
	
	  @PostMapping("change_password/{token}")
	    public ResponseEntity <String> processResetPassword(@RequestBody String password,@PathVariable("token") String token) {
	    	
	    	    User user = userservice.getByResetPasswordToken(token);
	    	    
	    	     if (user == null) {
	    	    	 return ResponseEntity.badRequest().body("invalid Token");
	    	    } else {           
	    	    	userservice.updatePassword(user, password);
	    	         
	    	    	return ResponseEntity.status(HttpStatus.OK).body("Password Reset Successfully");
	    	    }

	    }
	

}
