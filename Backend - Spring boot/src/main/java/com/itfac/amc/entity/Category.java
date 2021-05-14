package com.itfac.amc.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.itfac.amc.util.Auditable;
import com.itfac.amc.validation.OnCreate;
import com.itfac.amc.validation.OnUpdate;

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
	
	@NotEmpty(message="Category name cannot be Empty",groups = {OnCreate.class,OnUpdate.class})
	@Size(max=100,message="Category name must be 100 characters",groups = {OnCreate.class,OnUpdate.class})
	@Column(name = "category_name", nullable = false, length = 100)
	private String categoryName;
	
	private boolean active;
	
	@Column(name = "saved_ip", length = 20)
	private String savedIp;
}
