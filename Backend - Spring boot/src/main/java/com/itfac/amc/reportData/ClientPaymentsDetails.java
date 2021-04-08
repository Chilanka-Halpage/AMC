package com.itfac.amc.reportData;

import java.math.BigDecimal;

public interface ClientPaymentsDetails {
	public String getamc_no(); 
	public String getproduct_name(); 
	public String getfrequency();
	public String getcurrency_name(); 
	public BigDecimal getexchage_rate(); 
	public BigDecimal gettotal();
	public BigDecimal gettotal_lkr();
	public String getclient_id();
}
