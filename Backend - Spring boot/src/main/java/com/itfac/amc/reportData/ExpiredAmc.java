package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.util.Date;

public interface ExpiredAmc {

	public String getamc_no();
	public String getcategory_name();
	public String getclient_name();
	public String getcontact_no();
	public String getfrequency();
	public BigDecimal getinvoice_amount();
	public BigDecimal gettotal_value_lkr();
	public Date getdue_date();
}
