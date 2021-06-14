package com.itfac.amc.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
@Table(name = "Amc_due_invoice")
public class AmcDueInvoice {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(name = "due_date", nullable = false )
	@Temporal(TemporalType.DATE)
	private Date dueDate;
	
	@Column(name = "invoice_amount", nullable = false)
	private BigDecimal invoiceAmt;
	
	@Column(name = "invoice_payble_lkr", nullable = true)
	private BigDecimal InvoicePaybleLkr;
	
	private boolean settle;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "amc_no", nullable = false, foreignKey = @ForeignKey(name = "amc_due_fk1"))
	private AmcMaster amcMaster;
	
	@ManyToOne()
	@JoinColumn(name = "currency_id", nullable = false, foreignKey = @ForeignKey(name = "amc_due_fk4"))
	private Currency currency;


	

}
