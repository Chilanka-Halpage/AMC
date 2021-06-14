package com.itfac.amc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.itfac.amc.util.Auditable;
import com.itfac.amc.validation.OnCreate;
import com.itfac.amc.validation.OnUpdate;

//import org.hibernate.annotations.GenericGenerator;

//import org.hibernate.annotations.Parameter;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
public class User extends Auditable{

	@Id
	@Column(name = "user_id", length = 100)
	private String userId;
	//columnDefinition = "TEXT", 

	@NotEmpty(message = "user name cannot be Empty",groups = OnCreate.class)
	@Size(max = 50, message = "User name must be 50 characters",groups = OnCreate.class)
	@Column(length = 50, nullable = false)
	private String uname;

	
	@Size(max = 200, message = "Password must be 200 characters")
	@Column(length = 200, nullable = false)
	private String password;

	@NotEmpty(message = "Role cannot be Empty",groups = {OnCreate.class,OnUpdate.class})
	@Size(max = 20, message = "Role must be 20 characters",groups = {OnCreate.class,OnUpdate.class})
	@Column(length = 20, nullable = false)
	private String role;

	private boolean active;

	@NotEmpty(message = "Email cannot be Empty",groups = OnCreate.class)
	@Size(max = 100, message = "User name must be 100 characters",groups = OnCreate.class)
	@Email(message = "Email should be valid")
	@Column(length = 100, nullable = false)
	private String email;

	@NotEmpty(message = "CantactNo cannot be Empty",groups = OnCreate.class)
	@Size(max = 60, message = "Contact number must be 60 characters",groups = OnCreate.class)
	@Column(name = "contact_no")
	private String contactNo;

	@Column(name = "reset_password_token", length = 60)
	private String resetPasswordToken;
	
	@Column(name = "saved_ip", length = 20)
	private String savedIp;

}
