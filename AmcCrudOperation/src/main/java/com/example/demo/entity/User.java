package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class User {

	@Id
	@Column(name = "user_id", length = 15)
	private String userId;

	@Column(length = 50, nullable = false)
	private String uname;

	@Column(length = 200, nullable = false)
	private String password;
	
	@Column(length = 20, nullable = false)
	private String role;

	private boolean active;

	@Column(length = 60, nullable = false)
	private String email;

	@Column(name = "conatact_no", length = 60, nullable = false)
	private String contactNo;
}
