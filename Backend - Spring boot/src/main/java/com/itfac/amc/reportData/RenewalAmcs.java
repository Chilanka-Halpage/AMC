package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.util.Date;

public interface RenewalAmcs {

	public String getamc_no();
	public String getclietn_iD();
	public String getclient_name();
	public String getcontact_no();
	public Date getmtc_end_date();
	public String getcategory_name();
	public String getfrequency();
	public String getcurrency_name();
	public BigDecimal getinvoice_amt();
	public BigDecimal gettotal_value();
}
