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

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.itfac.amc.util.Auditable;

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

	@Temporal(TemporalType.DATE)
	@Column(name = "start_date", nullable = false)
	private Date startDate;

	private boolean active;

	@Column(length = 10, nullable = false)
	private String frequency;

	@Column(name = "exchage_rate", precision = 5, scale = 2, nullable = false)
	private BigDecimal exchangeRate;

	@Column(name = "total_value", columnDefinition = "decimal(10,2) default 0.0")
	private BigDecimal totalValue = new BigDecimal(0.0);

	@Column(name = "total_value_lkr", columnDefinition = "decimal(10,2) default 0.0")
	private BigDecimal totalValueLkr = new BigDecimal(0.0);

	@Column(length = 100, nullable = false)
	private String remark;

	@Column(name = "inv_desc", length = 200)
	private String invDesc;

	@Column(name = "last_modified_ip", length = 20)
	private String lastModifiedIp;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "client_id", nullable = false, foreignKey = @ForeignKey(name = "amc_master_fk1"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Client client;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "currency_id", nullable = false, foreignKey = @ForeignKey(name = "amc_master_fk2"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Currency currency;

}
