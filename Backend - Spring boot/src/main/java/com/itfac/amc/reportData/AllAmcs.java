package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.util.Date;

public interface AllAmcs {

	public String getamc_no();
	public Date getstart_date();
	public String getclient_name();
	public String getcontact_person();
	public String getcategory_name();
	public String getfrequency();
	public String getcurrency_name();
	public BigDecimal getexchage_rate();
	public int getmtc_qty();
	public BigDecimal gettotal_value();
	public boolean getactive();
	//--------------------------------------------------
}