package com.itfac.amc.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.dto.UserNameDto;
import com.itfac.amc.dto.logindetailsDTo;
import com.itfac.amc.entity.LoginDetails;
import com.itfac.amc.entity.User;
import com.itfac.amc.reportData.viewLoginDetails;
import com.itfac.amc.service.LoginDetailsService;
import com.itfac.amc.service.UserService;
import com.itfac.amc.Exception.UserNotFoundException;
import com.itfac.amc.validation.OnCreate;
import com.itfac.amc.validation.OnUpdate;

import net.bytebuddy.utility.RandomString;

@RestController
@RequestMapping("User/")
public class UserController {

	@Autowired
	UserService userservice;

	@Autowired
	private UserService userService;

	@Autowired
	LoginDetailsService loginDetailsService;
	
	private String password_Link;

	@GetMapping("admin/findAllUser")
	public ResponseEntity<List<User>> getAllUser() {
		List<User> allUser = userservice.getAllUser();
		return ResponseEntity.status(HttpStatus.OK).body(allUser);
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
	public ResponseEntity<String> addUser(@Validated(OnCreate.class) @RequestBody User user,HttpServletRequest httpServletRequest) {
		User userr =userservice.getByUserName(user);
		if(userr==null) {
		 userservice.addUser(user,httpServletRequest);
		 return ResponseEntity.ok().body("succefully added.");
		}
		else {
			return ResponseEntity.badRequest().body("User already exist.");
		}
	}

	@PutMapping("admin/updateUser/{id}")
	public ResponseEntity<String> updateUsers(@PathVariable("id") String userId,@Validated(OnUpdate.class) @RequestBody User user) {
		userservice.updateUser(user,userId);
		return ResponseEntity.ok().body("succefully updated");
	}

	// get user details
	@GetMapping("/allusers/{userId}")
	ResponseEntity<User> getUser(@PathVariable("userId") String userId) {
		User user = userService.getUser(userId);
		if (user != null) {
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No User with name " + userId).body(user);
	}

	// update user's password
	@PutMapping(path = "/updatePassword/{current_password}/{id}")
	public Boolean updatePassword(
			@PathVariable(value = "current_password") String current_password,@PathVariable(value = "id") String userId, 
			@RequestBody User user) {
		return userservice.updatePassword(current_password,userId, user);
	}

	// update User's email and contact No
	@PutMapping(path = "/update/{id}")
	public ResponseEntity<String> updateUser(@PathVariable(value = "id") String userId, @RequestBody User user) {
		return userservice.updateUser(userId, user);
	}

	// get login details
	@GetMapping("/loginDetails")
	public Page<viewLoginDetails> LoginDetail(Pageable pageable) {
		return loginDetailsService.loginDetails(pageable);
	}

	// get user name to dashboard---------------------
	@GetMapping("getUname/{idname}")
	UserNameDto getUsername(@PathVariable("idname") String userid) {
		UserNameDto Uname = userService.getUserName(userid);
		return Uname;

	}
	
	@Value("${password-link}")
	public void setPasswordLink(String passwordLink) {
		password_Link = passwordLink;
	}

	@PostMapping("forgot_password")
	ResponseEntity<String> processForgotPassword(@RequestBody Map<String, Object> mail) {
		String email = (String) mail.get("email");
		String token = RandomString.make(30);

		try {
			userservice.updateResetPasswordToken(token, email);
			String resetPasswordLink = password_Link + token;
			userservice.sendEmail(email, resetPasswordLink);
			return ResponseEntity.status(HttpStatus.OK).body("check email");

		} catch (UserNotFoundException ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		} catch (UnsupportedEncodingException | MessagingException e) {

		}
		return null;

	}

	@PostMapping("change_password/{token}")
	public ResponseEntity<String> processResetPassword(@RequestBody String password,
			@PathVariable("token") String token) {

		User user = userservice.getByResetPasswordToken(token);

		if (user == null) {
			return ResponseEntity.badRequest().body("invalid Token");
		} else {
			userservice.updatePassword(user, password);

			return ResponseEntity.status(HttpStatus.OK).body("Password Reset Successfully");
		}

	}

	@GetMapping("getlast7logdetails")
	public ResponseEntity<List<logindetailsDTo>> logindetailslist() {
		List<logindetailsDTo> result = loginDetailsService.logindetailslist();
		return ResponseEntity.status(HttpStatus.OK).body(result);
	 }	

	@GetMapping("getlast15logdetails/{userId}")
	public ResponseEntity<List<LoginDetails>> logindetailslistbyId(	@PathVariable("userId") String userId){
		List<LoginDetails> result = loginDetailsService.logindetailslistbyId(userId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}	

	//logout details
	@PutMapping("logoutDetails/{userId}")
	public void logoutDetails(HttpServletRequest httpServletRequest,@PathVariable("userId") String userId){
		System.out.println(userId);
		loginDetailsService.logOutDetails(httpServletRequest, userId);
	}
}
