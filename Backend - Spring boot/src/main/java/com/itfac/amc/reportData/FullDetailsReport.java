package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.util.Date;

public interface FullDetailsReport {

	public String getamc_serial_no();
	public String getamc_no();
	public String getproduct_name();
	public String getclient_name();
	public String getcategory_name();
	public Date getmtc_start_date();
	public Date getmtc_end_date();
	public String getfrequency();
	public BigDecimal getmtc_amt_for_frequency();
	public BigDecimal gettotal_value();
	public boolean getactive();
}
