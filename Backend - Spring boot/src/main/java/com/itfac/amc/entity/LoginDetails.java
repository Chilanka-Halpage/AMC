package com.itfac.amc.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name = "login_details")
public class LoginDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int logno;
	
	@Column(name = "loged_datetime", nullable = false)
	private Date logedTime;
	
	@Column(name = "loged_ip", length = 20)
	private String logedIp;
	
	@Column(name = "logout_datetime")
	private Date logoutTime;
	
	@Column(name = "logout_ip", length = 20)
	private String logoutIp;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = true, foreignKey = @ForeignKey(name = "login_details_fk"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private User user;
	
}
