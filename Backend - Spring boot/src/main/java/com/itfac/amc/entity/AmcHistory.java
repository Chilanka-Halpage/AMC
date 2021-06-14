package com.itfac.amc.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "amc_history")
@IdClass(AmcHistoryId.class)
public class AmcHistory {
	
	@Id
	@Column(name = "amc_no", length = 10, nullable = false)
	private String amcNo;
	
	@Id
	@Column(name = "tdatetime")
	private Date dateTime;
	
	@Id
	@Column(name = "field_name", length = 45, nullable = false)
	private String fieldName;
	
	@Column(name = "old_value", length = 45, nullable = false)
	private String oldValue;
	
	@Column(name = "new_value", length = 45, nullable = false)
	private String newValue;
	
	@Column(name = "user_id", length = 45, nullable = false)
	private String userId;
}
