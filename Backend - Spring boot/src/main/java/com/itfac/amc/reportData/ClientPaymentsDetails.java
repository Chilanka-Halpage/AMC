package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.util.Date;

public interface ClientPaymentsDetails {
	public String getamc_no(); 
	public String getproduct_name(); 
	public String getcurrency_name(); 
	public BigDecimal getexchange_rate();
	public BigDecimal gettotal();
	public BigDecimal getbalance();
	public String getuser_id();
	public String getpay_mode();
	public Date getrec_date();
	public String getdepartment_name();
	public String getrec_no(); 
	
}
