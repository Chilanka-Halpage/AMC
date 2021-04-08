package com.itfac.amc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.itfac.amc.util.Auditable;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Product extends Auditable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "product_id")
	private int productId;

	@NotEmpty(message = "Product name cannot be Empty")
	@Size(max = 50, message = "Product must be 50 characters")
	@Column(name = "product_name", nullable = false, length = 100)
	private String productName;

	private boolean active;

	@Column(name = "saved_ip", length = 20)
	private String savedIp;
}
