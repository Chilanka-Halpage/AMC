package com.itfac.amc.dto;

import java.util.Date;

public interface logindetailsDTo {
	
	public String getuser_id();
	public String getuname();
	public String getloged_ip();
	public Date getloged_datetime();
    public Date getlogout_datetime();
	
}
