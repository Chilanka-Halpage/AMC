package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.util.Date;

public interface ExpiredAmc {

	public String getamc_no();
	public Date getdue_date();
	public String getcategory_name();
	public String getclient_name();
	public String getcontact_no();
	public String getfrequency();
	public BigDecimal getinvoice_amt();
	public BigDecimal gettotal_value();
}
