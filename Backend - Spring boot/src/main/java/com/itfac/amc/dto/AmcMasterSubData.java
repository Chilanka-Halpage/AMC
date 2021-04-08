package com.itfac.amc.dto;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.itfac.amc.entity.Currency;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
public class AmcMasterSubData {
	private Date startDate;
	private String frequency;
	private boolean active;
	private BigDecimal exchangeRate;
	private BigDecimal totalValue;
	private BigDecimal totalValueLkr;
	private String remark;
	private String invDesc;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Currency currency;
	
}
