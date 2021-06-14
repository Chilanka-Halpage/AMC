package com.itfac.amc.reportData;

import java.util.Date;

public interface viewLoginDetails {
	public String getuser_id();
	public String getuname();
	public String getloged_ip();
	public Date getloged_datetime();
	public String getlogout_ip();
	public Date getlogout_datetime();
}
