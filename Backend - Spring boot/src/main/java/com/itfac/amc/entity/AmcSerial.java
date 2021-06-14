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
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import com.itfac.amc.validation.OnCreate;

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
	private String amcSerialNo;

	private boolean active;

	@NotEmpty(message = "Remark connot be empty", groups = OnCreate.class)
	@Size(max = 100, message = "Maximum length must be 100", groups = OnCreate.class)
	@Column(length = 100, nullable = false)
	private String remark;
	
	@NotEmpty(message = "Frequency connot be empty", groups = OnCreate.class)
	@Size(min = 7, max = 10, message = "Length must be between 7 and 10", groups = OnCreate.class)
	@Column(nullable = false)
	private String frequency;
	
	@Column(name = "contract_url")
	private String contractUrl;

	@NotNull(message = "Mtc start date connot be null", groups = OnCreate.class)
	@Temporal(TemporalType.DATE)
	@Column(name = "mtc_start_date", nullable = false)
	private Date mtcStartDate;

	@NotNull(message = "Mtc end date connot be null", groups = OnCreate.class)
	@Temporal(TemporalType.DATE)
	@Column(name = "mtc_end_date", nullable = false)
	private Date mtcEndDate;

	@NotNull(message = "Renewal date connot be null", groups = OnCreate.class)
	@Temporal(TemporalType.DATE)
	@Column(name = "renewal")
	private Date renewalDate;

	@NotNull(message = "Mtc qty connot be null", groups = OnCreate.class)
	@Column(name = "mtc_qty", nullable = false)
	private int mtcQty;

	@NotNull(message = "Mtc Amt per product connot be null", groups = OnCreate.class)
	@Positive(message = "Value must be Positive", groups = OnCreate.class)
	@Column(name = "mtc_amount_per_product", nullable = false)
	private BigDecimal mtcAmtPerProduct;

	@NotNull(message = "Mtc Amt per annum connot be null", groups = OnCreate.class)
	@Positive(message = "Value must be Positive", groups = OnCreate.class)
	@Column(name = "mtc_amount_for_given_annum", nullable = false)
	private BigDecimal mtcAmtPerAnnum;

	@NotNull(message = "Mtc Amt for frequency connot be null", groups = OnCreate.class)
	@Positive(message = "Value must be Positive", groups = OnCreate.class)
	@Column(name = "mtc_amount_for_given_frequency", nullable = false)
	private BigDecimal mtcAmtforfrequency;

	@NotNull(message = "Mtc Amt for frequency per item connot be null", groups = OnCreate.class)
	@Positive(message = "Value must be Positive", groups = OnCreate.class)
	@Column(name = "mtc_amount_for_given_frequency_item", nullable = false)
	private BigDecimal mtcAmtforfrequencyPerItem;

	@NotNull(message = "Mtc Amt per product LKR connot be null", groups = OnCreate.class)
	@Positive(message = "Value must be Positive", groups = OnCreate.class)
	@Column(name = "mtc_amount_per_product_lkr", nullable = false)
	private BigDecimal mtcAmtPerProductLkr;

	@NotNull(message = "Mtc Amt for given annum LKR connot be null", groups = OnCreate.class)
	@Positive(message = "Value must be Positive", groups = OnCreate.class)
	@Column(name = "mtc_amount_for_given_annum_lkr", nullable = false)
	private BigDecimal mtcAmtPerAnnumLkr;

	@NotNull(message = "Mtc Amt for given frequency LKR connot be null", groups = OnCreate.class)
	@Positive(message = "Value must be Positive", groups = OnCreate.class)
	@Column(name = "mtc_amount_for_given_frequency_lkr", nullable = false)
	private BigDecimal mtcAmtforfrequencyLkr;

	@NotNull(message = "Mtc Amt for given frequency per item LKR connot be null", groups = OnCreate.class)
	@Positive(message = "Value must be Positive", groups = OnCreate.class)
	@Column(name = "mtc_amount_for_given_frequency_item_lkr", nullable = false)
	private BigDecimal mtcAmtforfrequencyPerItemLkr;
	
	@NotNull(message = "AMC master connot be null in AMC serial", groups = OnCreate.class)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "amc_no", nullable = false, foreignKey = @ForeignKey(name = "amc_serial_fk1"))
	private AmcMaster amcMaster;
	
	@NotNull(message = "AMC product connot be null in AMC serial", groups = OnCreate.class)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "amc_product_id", nullable = false, foreignKey = @ForeignKey(name = "amc_serial_fk2"))
	private AmcProduct amcProduct;

	@NotNull(message = "Client department connot be null in AMC serial", groups = OnCreate.class)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "client_dept_id", nullable = false, foreignKey = @ForeignKey(name = "amc_serial_fk3"))
	private ClientDepartment clientDepartment;

	@NotNull(message = "Currency connot be null in AMC serial", groups = OnCreate.class)
	@ManyToOne()
	@JoinColumn(name = "currency_id", nullable = false, foreignKey = @ForeignKey(name = "amc_serial_fk4"))
	private Currency currency;

	@NotNull(message = "Category connot be null in AMC serial", groups = OnCreate.class)
	@ManyToOne()
	@JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "amc_serial_fk5"))
	private Category category;

}
