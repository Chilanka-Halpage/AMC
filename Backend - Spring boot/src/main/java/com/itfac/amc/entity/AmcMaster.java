package com.itfac.amc.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.itfac.amc.util.Auditable;
import com.itfac.amc.validation.OnCreate;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "amc_master")

public class AmcMaster extends Auditable{

	@Id
	@Column(name = "amc_no", length = 10, nullable = false)
	private String amcNo;

	@NotNull(message = "Start date connot be null", groups = OnCreate.class)
	@Temporal(TemporalType.DATE)
	@Column(name = "start_date", nullable = false)
	private Date startDate;

	private boolean active;

	@NotEmpty(message = "Frequency connot be empty", groups = OnCreate.class)
	@Size(min = 7, max = 10, message = "Length must be between 7 and 10", groups = OnCreate.class)
	@Column(length = 10, nullable = false)
	private String frequency;

	@NotNull(message = "Exchange rate connot be null", groups = OnCreate.class)
	@DecimalMax(value = "1000", inclusive = false, message = "Value must be less than 1000", groups = OnCreate.class)
	@Positive(message = "Value must be Positive", groups = OnCreate.class)
	@Digits(integer = 3, fraction = 2, message = "Value can have maximum 3 integral and 2 fractional digits", groups = OnCreate.class)
	@Column(name = "exchange_rate", precision = 5, scale = 2, nullable = false)
	private BigDecimal exchangeRate;

	@NotNull(message = "Total value connot be null", groups = OnCreate.class)
	@Positive(message = "Value must be Positive", groups = OnCreate.class)
	@Column(name = "total_value", columnDefinition = "decimal(10,2) default 0.0")
	private BigDecimal totalValue;

	@NotNull(message = "Total value LKR connot be null", groups = OnCreate.class)
	@Positive(message = "Value must be Positive", groups = OnCreate.class)
	@Column(name = "total_value_lkr", columnDefinition = "decimal(10,2) default 0.0")
	private BigDecimal totalValueLkr;

	@NotEmpty(message = "Remark connot be empty", groups = OnCreate.class)
	@Size(max = 100, message = "Maximum length must be 100", groups = OnCreate.class)
	@Column(length = 100, nullable = false)
	private String remark;

	@NotEmpty(message = "Invoice description connot be empty", groups = OnCreate.class)
	@Size(max = 200, message = "Maximum length must be 200", groups = OnCreate.class)
	@Column(name = "inv_desc", length = 200)
	private String invDesc;

	@Column(name = "last_modified_ip", length = 20)
	private String lastModifiedIp;

	//@NotNull(message = "Client connot be null in AMC master", groups = OnCreate.class)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "client_id", nullable = false, foreignKey = @ForeignKey(name = "amc_master_fk1"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Client client;

	@NotNull(message = "Currency connot be null in AMC master", groups = OnCreate.class)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "currency_id", nullable = false, foreignKey = @ForeignKey(name = "amc_master_fk2"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Currency currency;

}
