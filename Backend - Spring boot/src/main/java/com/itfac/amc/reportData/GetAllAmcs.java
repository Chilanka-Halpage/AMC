package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.sql.Date;

public interface GetAllAmcs {
public String	getamc_no();
public Date	getstart_date();
public String	getclient_name();
public String getconatact_person();
public int	getcategory_id();
public String getfrequency();
public int	getcurrency_id();
public BigDecimal getexchage_rate();
public int getmtc_qty();
public BigDecimal getmtc_amount_for_given_frequency_lkr();
public BigDecimal gettotal_value_lkr();
public boolean getactive();
}
