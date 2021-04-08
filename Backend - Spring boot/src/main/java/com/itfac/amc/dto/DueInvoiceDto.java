package com.itfac.amc.dto;

import java.util.Date;

public interface DueInvoiceDto {

	int getid();
	Date getdue_date();
	int getinvoice_amount();
	String getamc_no();
	int getproduct_id();
	int getcurrency_id();
	int getinvoice_balance();
	String getamc_serialno();
	
}
