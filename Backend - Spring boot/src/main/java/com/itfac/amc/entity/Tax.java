package com.itfac.amc.entity;

import java.math.BigDecimal;

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
public class Tax extends Auditable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "tax_id")
	private int taxId;

	@Column(name = "tax_name", nullable = false, length = 50)
	private String taxName;

	@Column(name = "short_name", nullable = false, length = 10)
	private String shortName;

	@Column(name = "tax_rate", precision = 5, scale = 2, nullable = false)
	private BigDecimal taxRate;

	private boolean active;

	@Column(name = "saved_ip", length = 20)
	private String savedIp;
}
