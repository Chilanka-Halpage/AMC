package com.itfac.amc.dto;

import java.util.Date;

public interface DueInvoiceDto {

	int getid();
	Date getdue_date();
	int getinvoice_amount();
	String getamc_no();
	int getcurrency_id();
	int getinvoice_payble_lkr();
	
}
