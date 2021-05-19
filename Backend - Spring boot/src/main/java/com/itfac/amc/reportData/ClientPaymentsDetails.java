package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.util.Date;

public interface ClientPaymentsDetails {
	public String getamc_no(); 
	public String getproduct_name(); 
	public String getdepartment_name(); 
	public String getamc_serial_no();
	public String getcurrency_name(); 
	public BigDecimal getexchage_rate();
	public BigDecimal getexchange_rate();   
	public BigDecimal gettotal();
	public BigDecimal getbalance();
	public String getuser_id();
	public Date getrec_date();
	public String getrec_no(); 
}
