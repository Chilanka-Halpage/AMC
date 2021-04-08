package com.itfac.amc.entity;

import java.math.BigDecimal;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;

@Data
@Entity
@Table(name = "amc_product")
public class AmcProduct{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "amc_product_no")
	private int amcProdNo;
	
	@Column(name = "product_description", length = 100, nullable = false)
	private String productDescription;
	
	@Column(name = "life_start_date")
	@Temporal(TemporalType.DATE)
	private Date lifeStartDate;
	
	@Column(name = "life_end_date")
	@Temporal(TemporalType.DATE)
	private Date lifeEndDate;
	
	private BigDecimal price;
	
	private int quantity;
	
	@Column(name = "exchage_rate", precision = 5, scale = 2, nullable = false)
	private BigDecimal exchangeRate;
	
	@Column(name = "total_value", columnDefinition = "decimal(10,2) default 0.0")
	private BigDecimal totalValue = new BigDecimal(0.0);
	
	@Column(name = "total_value_lkr", columnDefinition = "decimal(10,2) default 0.0")
	private BigDecimal totalValueLkr = new BigDecimal(0.0);
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "amc_no", nullable = false, foreignKey = @ForeignKey(name = "amc_product_fk1"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private AmcMaster amcMaster;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false, foreignKey = @ForeignKey(name = "amc_product_fk2"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Product product;
	
}
