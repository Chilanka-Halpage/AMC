package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.sql.Date;

public interface RenewedAmcs {
	public String getamc_no();
	public String getamc_serial_no();
	public Date getmtc_start_date();
	public String getclient_name();
	public String getcategory_name();
	public int getmtc_qty();
	public String getfrequency();
	public String getcurrency_name();
	public BigDecimal getexchange_rate();
	public String getdepartment_name();
	public BigDecimal gettotal_value_lkr();
}
