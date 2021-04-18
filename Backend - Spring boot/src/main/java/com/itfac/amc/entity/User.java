package com.itfac.amc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

//import org.hibernate.annotations.GenericGenerator;

//import org.hibernate.annotations.Parameter;

import lombok.Data;

@Data
@Entity
public class User {

	@Id
	@Column(name = "user_id", length = 100)
	private String userId;
	//columnDefinition = "TEXT", 

	@NotEmpty(message = "User name cannot be Empty")
	@Size(max = 50, message = "User name must be 50 characters")
	@Column(length = 50, nullable = false)
	private String uname;

	@NotEmpty(message = "Password cannot be Empty")
	@Size(max = 200, message = "Password must be 200 characters")
	@Column(length = 200, nullable = false)
	private String password;

	@NotEmpty(message = "Role cannot be Empty")
	@Size(max = 20, message = "Role must be 20 characters")
	@Column(length = 20, nullable = false)
	private String role;

	private boolean active;

	@NotEmpty(message = "Email cannot be Empty")
	@Size(max = 100, message = "User name must be 100 characters")
	@Email(message = "Email should be valid")
	@Column(length = 100, nullable = false)
	private String email;

	@NotEmpty(message = "Contact Number cannot be Empty")
	@Size(max = 60, message = "Contact number must be 60 characters")
	@Column(name = "conatact_no", length = 60, nullable = false)
	private String contactNo;

	@Column(name = "reset_password_token", length = 60)
	private String resetPasswordToken;

}
