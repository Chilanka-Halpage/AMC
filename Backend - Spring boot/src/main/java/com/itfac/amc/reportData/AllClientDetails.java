package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.util.List;

public interface AllClientDetails {

	//not
	public String getclietn_iD();
	public String getclient_name();
	public String getamc_no();
	public String getfrequency();
	public String getproduct_name();
	public String getcategory_name();
	public int getmtc_qty();
	public BigDecimal getmtc_amt_per_product();
	public BigDecimal gettotal_value();
	//--------------------------------------------------------
	public List<AllClientDetails> findAll();
	}
