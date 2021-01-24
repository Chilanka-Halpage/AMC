package com.example.demo.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Frequency {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "frequency_id")
	private int frequencyId;
	
	@Column(nullable = false, length = 100)
	private String frequency;
	
	private boolean active;
	
	@Column(name = "saved_by", length = 15)
	private String savedBy;
	
	@Column(name = "saved_on")
	private Date savedOn;
	
	@Column(name = "saved_ip", length = 20)
	private String savedIp;
}
