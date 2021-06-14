package com.itfac.amc.dto;

import java.util.Date;

public interface recieptDto {
	
	String getrec_no();
	int getbalance();
	int getbalance_lkr();
	boolean getcancel();
	String getamc_no();
    int getcategory_id();
    int getclient_dept_id();
    int getcurrency_id();
    String getpi_no();
    String getpay_mode();
    String getcategory_name();
    Date getrec_date();
    int getexchage_rate();
    int gettotal_lkr();
    
}
