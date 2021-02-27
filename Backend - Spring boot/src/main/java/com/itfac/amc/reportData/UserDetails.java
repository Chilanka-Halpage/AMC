package com.itfac.amc.reportData;

import javax.persistence.Column;

public interface UserDetails {
	public String getuser_id();
	public String getuname();
	public String getrole();
	public boolean getactive();
	public String getemail();
	public String getconatact_no();
}
