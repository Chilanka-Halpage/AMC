package com.itfac.amc.dto;

import java.math.BigDecimal;
import java.util.Date;

public interface DueInvoiceDto {

	int getid();
	Date getdue_date();
	int getinvoice_amount();
	String getamc_no();
	int getcurrency_id();
	BigDecimal getinvoice_payble_lkr();
	
}
