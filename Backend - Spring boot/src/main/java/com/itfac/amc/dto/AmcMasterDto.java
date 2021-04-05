package com.itfac.amc.dto;

import java.math.BigDecimal;
import java.util.Date;

public interface AmcMasterDto {
	String getAmcNo();
	Date getStartDate();
	boolean isActive();
	String getFrequency();
	BigDecimal getTotalValueLkr();
	
}
