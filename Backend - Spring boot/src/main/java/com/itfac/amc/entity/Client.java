package com.itfac.amc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.itfac.amc.util.Auditable;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
public class Client extends Auditable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "client_id")
	private int clientId;
	
	@NotEmpty(message = "Client name cannot be empty")
	@Size(max = 100, message = "Client name must be maximum 100 characters")
	@Column(name = "client_name", length = 100, nullable = false)
	private String clientName;
	
	private boolean active;
	
	@NotEmpty(message = "Contact number cannot be empty")
	@Size(min = 10, max = 60, message = "Contact number must be between 10 and 60 characters")
	@Column(name = "contact_no", length = 60, nullable = false)
	private String contactNo;
	
	@NotEmpty(message = "Contact person cannot be empty")
	@Size(max = 100, message = "Contact person must be maximum 100 characters")
	@Column(name = "contact_person", length = 100, nullable = false)
	private String contactPerson;
	
	@NotEmpty(message = "Contact person cannot be empty")
	@Column(nullable = false)
	private String address;
	
	@Column(name = "last_modified_ip", length = 20)
	private String lastModifiedIp;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "client_fk"))
	@JsonIgnore
	private User user;
}
