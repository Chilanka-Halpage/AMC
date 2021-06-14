package com.itfac.amc.reportData;

import java.math.BigDecimal;

public interface GetInvoice {
	
	public String getamc_no();
	public String getcategory_name(); 
	public String getcurrency_name(); 
	public BigDecimal getexchage_rate();
	public BigDecimal gettotal_tax(); 
	public BigDecimal gettotal_amount();
	public BigDecimal getinvoice_balance(); 
	public BigDecimal gettotal_amount_payble();

}
