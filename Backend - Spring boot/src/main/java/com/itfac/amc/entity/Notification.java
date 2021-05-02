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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name = "notification")
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "notification_id")
	private int NotificationId;
	
	@Column(name = "notification")
	private String Notification;
	
	@Column(name = "saved_date")
	private Date SavedDate;
	
	private Boolean isRead;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "user_fk1"))
	@JsonIgnore
	private User user;
	
//	@OneToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "amc_serial_no", foreignKey = @ForeignKey(name = "user_fk2"))
//	@JsonIgnore
//	private AmcSerial amcSerial;
}
