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

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "amc_serial")
public class AmcSerial {

	@Id
	@Column(name = "amc_serial_no", length = 15)
	private String amcSerialNo = "default";

	private boolean active;

	@Column(length = 100, nullable = false)
	private String remark;
	
	@Column(nullable = false)
	private String frequency;
	
	@Column(name = "contract_url")
	private String contractUrl;

	@Temporal(TemporalType.DATE)
	@Column(name = "mtc_start_date", nullable = false)
	private Date mtcStartDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "mtc_end_date", nullable = false)
	private Date mtcEndDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "renewal")
	private Date renewalDate;

	@Column(name = "mtc_qty", nullable = false)
	private int mtcQty;

	@Column(name = "mtc_amount_per_product", nullable = false)
	private BigDecimal mtcAmtPerProduct;

	@Column(name = "mtc_amount_for_given_annum", nullable = false)
	private BigDecimal mtcAmtPerAnnum;

	@Column(name = "mtc_amount_for_given_frequency", nullable = false)
	private BigDecimal mtcAmtforfrequency;

	@Column(name = "mtc_amount_for_given_frequency_item", nullable = false)
	private BigDecimal mtcAmtforfrequencyPerItem;

	@Column(name = "mtc_amount_per_product_lkr", nullable = false)
	private BigDecimal mtcAmtPerProductLkr;

	@Column(name = "mtc_amount_for_given_annum_lkr", nullable = false)
	private BigDecimal mtcAmtPerAnnumLkr;

	@Column(name = "mtc_amount_for_given_frequency_lkr", nullable = false)
	private BigDecimal mtcAmtforfrequencyLkr;

	@Column(name = "mtc_amount_for_given_frequency_item_lkr", nullable = false)
	private BigDecimal mtcAmtforfrequencyPerItemLkr;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "amc_no", nullable = false, foreignKey = @ForeignKey(name = "amc_serial_fk1"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private AmcMaster amcMaster;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "amc_product_id", nullable = false, foreignKey = @ForeignKey(name = "amc_serial_fk2"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private AmcProduct amcProduct;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "client_dept_id", nullable = false, foreignKey = @ForeignKey(name = "amc_serial_fk3"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private ClientDepartment clientDepartment;

	@ManyToOne()
	@JoinColumn(name = "currency_id", nullable = false, foreignKey = @ForeignKey(name = "amc_serial_fk4"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Currency currency;

	@ManyToOne()
	@JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "amc_serial_fk5"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Category category;

}
