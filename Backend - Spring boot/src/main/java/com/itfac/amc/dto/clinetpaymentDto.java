package com.itfac.amc.dto;

import java.sql.Date;

public interface clinetpaymentDto {
	
	String getrec_no();
	int getbalance();
	String getpay_mode();
	String getcategory_name();
    String getpi_no();
    int getclient_id();
    Date getrec_date();
}
