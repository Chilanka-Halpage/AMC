package com.itfac.amc.dto;

import java.math.BigDecimal;
import java.sql.Date;


public interface ProformaInvoiceDto {
	
	String getpi_no();
	BigDecimal getexchage_rate();
	BigDecimal gettotal_tax();
	BigDecimal gettotal_amount();
	BigDecimal gettotal_amount_lkr();
	Date getpi_date();
	String getamc_no();
	boolean gettax_applicable();
	int getcategory_id();
	int getcurrency_id();
	int getclient_dept_id();
	int getfrequency_id();
	String getremark();
	String getsaved_by();
	BigDecimal gettotal_payble();
	BigDecimal gettotal_payble_lkr();
}
