package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.util.Date;

public interface RenewalAmcs {

	public String getamc_no();
	public String getamc_serial_no(); 
	public Date getrenewal();
	public String getuser_id();
	public String getclient_name();
	public String getcategory_name();
	public String getfrequency();
	public String getcurrency_name(); 
	public BigDecimal getinvoice_amount(); 
	public BigDecimal gettotal_value_lkr();
	public int getmtc_qty();
}
