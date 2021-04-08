package com.itfac.amc.reportData;

public interface GetInvoice {
	
	public String getamc_no();
	public String getcategory_name(); 
	public String getcurrency_name(); 
	public int getexchage_rate();
	public int gettotal_tax(); 
	public int gettotal_amount();
	public int getinvoice_amount(); 
	public int gettotal_amount_payble();

}
