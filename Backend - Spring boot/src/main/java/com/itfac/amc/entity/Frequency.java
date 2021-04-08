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
public class Frequency extends Auditable {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "frequency_id")
	private int frequencyId;

	@NotEmpty(message = "Frequency cannot be Empty")
	@Size(max = 100, message = "Frequecny must be 100 characters")
	@Column(nullable = false, length = 100)
	private String frequency;

	private boolean active;

	@Column(name = "saved_ip", length = 20)
	private String savedIp;
}
