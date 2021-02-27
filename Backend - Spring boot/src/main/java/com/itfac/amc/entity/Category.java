package com.itfac.amc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.itfac.amc.util.Auditable;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
public class Category extends Auditable{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "category_id")
	private int categoryId;
	
	@Column(name = "category_name", nullable = false, length = 100)
	private String categoryName;
	
	private boolean active;
	
	@Column(name = "saved_ip", length = 20)
	private String savedIp;
}
