package com.itfac.amc.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.itfac.amc.util.Auditable;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
public class Receipt extends Auditable {

	@Id
	@Column(name = "rec_no", length = 10)
	private String recNo;

	@Column(name = "rec_date", nullable = false)
	@Temporal(TemporalType.DATE)
	private Date recDate;

	private boolean cancel;

	@Column(name = "cancel_reason", length = 100)
	private String cancelReason;

	@Column(name = "exchage_rate", precision = 5, scale = 2, nullable = false)
	private BigDecimal exchageRate;

	@Column(length = 150)
	private String description;

	@Column(length = 10)
	private String payMode;

	@Column(nullable = false)
	private BigDecimal total;

	@Column(columnDefinition = "decimal(10,2) default 0.0")
	private BigDecimal balance = new BigDecimal(0.0);

	@Column(name = "total_lkr", nullable = false)
	private BigDecimal totalLkr;

	@Column(name = "balance_lkr", columnDefinition = "decimal(10,2) default 0.0")
	private BigDecimal balanceLkr = new BigDecimal(0.0);

	@Column(name = "saved_ip", length = 20)
	private String savedIp;

	@Column(name = "canceled_by", length = 15)
	private String canceledBy;

	@Column(name = "canceled_on")
	private Date canceledOn;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "amc_no", nullable = false, foreignKey = @ForeignKey(name = "receipt_fk1"))
	private AmcMaster amcMaster;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "client_dept_id", nullable = false, foreignKey = @ForeignKey(name = "receipt_fk2"))
	private ClientDepartment clientDepartment;

	@ManyToOne()
	@JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "receipt_fk3"))
	private Category category;

	@ManyToOne()
	@JoinColumn(name = "currency_id", nullable = false, foreignKey = @ForeignKey(name = "receipt_fk4"))
	private Currency currency;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pi_no", nullable = false, foreignKey = @ForeignKey(name = "receipt_fk5"))
	private ProformaInvoice invoice;
}
