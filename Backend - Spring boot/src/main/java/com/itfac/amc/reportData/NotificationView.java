package com.itfac.amc.reportData;

import java.util.Date;

public interface NotificationView {
	public String getuser_id();
	public String getnotification();
	public Date getsaved_date();
	public Boolean getis_read();
	public Date getrenewalDate();
}
