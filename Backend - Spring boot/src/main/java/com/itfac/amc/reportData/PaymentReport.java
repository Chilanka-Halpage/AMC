package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.util.Date;

public interface PaymentReport {
	public String getamc_no();
	public String getdepartment_name();
	public String getclient_name();
	public String getproduct_name();
	public String getfrequency();
	public String getcurrency_name();
	public BigDecimal getexchange_rate();
	public BigDecimal getbalance_lkr();
	public String getrec_no();
	public String getpay_mode();
    BigDecimal gettotal_lkr();
	public Date getrec_date();
	public String getcategory_name();
}