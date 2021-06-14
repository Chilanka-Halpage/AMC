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

import com.itfac.amc.util.Auditable;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "proforma_invoice")
public class ProformaInvoice extends Auditable {
	
	@Id
	@Column(name = "pi_no", length = 10,unique=true)
	private String piNo;
	
	@Column(name = "pi_date", nullable = false)
	@Temporal(TemporalType.DATE)
	private Date piDate;
	
	private boolean cancel;
	
	@Column(name = "cancel_reason", length = 100)
	private String cancelReason;
	
	@Column(name = "tax_applicable")
	private boolean taxApplicable;
	
	@Column(name = "exchage_rate", precision = 5, scale = 2, nullable = false)
	private BigDecimal exchageRate;
	
	@Column(name = "total_tax", columnDefinition = "decimal(10,2) default 0.0")
	private BigDecimal totalTax = new BigDecimal(0.0);
	
	@Column(name = "total_amount")
	private BigDecimal totalAmt;
	
	@Column(name = "total_amount_lkr")
	private BigDecimal totalAmtLkr;
	
	@Column(name = "total_payble")
	private BigDecimal totalPayble;
	
	@Column(name = "total_payble_lkr")
	private BigDecimal totalPaybleLkr;
	
	@Column(length = 100, nullable = false)
	private String remark;
	
	@Column(name = "saved_ip", length = 20)
	private String savedIp;
	
	@Column(name = "canceled_by", length = 15)
	private String canceledBy;
	
	@Column(name = "canceled_on")
	private Date canceledOn;
	
	@ManyToOne()
	@JoinColumn(name = "frequency_id", nullable = false, foreignKey = @ForeignKey(name = "proforma_fk1"))
	private Frequency frequency;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "client_dept_id", nullable = false, foreignKey = @ForeignKey(name = "proforma_fk2"))
	private ClientDepartment clientDepartment;
	
	@ManyToOne()
	@JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "proforma_fk3"))
	private Category category;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "amc_no", nullable = false, foreignKey = @ForeignKey(name = "proforma_fk4"))
	private AmcMaster amcMaster;
	
	@ManyToOne()
	@JoinColumn(name = "currency_id", nullable = false, foreignKey = @ForeignKey(name = "proforma_fk5"))
	private Currency currency;
	
	@ManyToOne()
	@JoinColumn(name = "tax_id", foreignKey = @ForeignKey(name = "proforma_fk6"))
	private Tax tax;

}
