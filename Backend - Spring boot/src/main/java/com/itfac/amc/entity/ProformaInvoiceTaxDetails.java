package com.itfac.amc.entity;

import java.math.BigDecimal;

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

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;

@Data
@Entity
@Table(name = "Proforma_invoice_tax_details")
public class ProformaInvoiceTaxDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(name = "tax_rate",precision = 5,scale = 2, nullable = false)
	private BigDecimal taxRate;
	
	@Column(name = "tax_amount", nullable = false)
	private BigDecimal taxAmt;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pi_no", nullable = false, foreignKey = @ForeignKey(name = "proforma_tax_fk1"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private ProformaInvoice invoice;
	
	@ManyToOne()
	@JoinColumn(name = "tax_id", nullable = false, foreignKey = @ForeignKey(name = "proforma_tax_fk2"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Tax tax;
	
	@ManyToOne()
	@JoinColumn(name = "product_id", nullable = false, foreignKey = @ForeignKey(name = "proforma_tax_fk3"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Product product;
}
