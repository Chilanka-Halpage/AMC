package com.itfac.amc.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface DueInvoicecheckDto {

	String getpi_no();
	LocalDate getpi_date();
	String getfrequency();
	BigDecimal gettotal_amount();
	BigDecimal gettotal_payble_lkr();
	int getcurrency_id();
	String getamc_no();
	
}
