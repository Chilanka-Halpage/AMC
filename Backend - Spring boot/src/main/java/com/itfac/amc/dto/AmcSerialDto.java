package com.itfac.amc.dto;

import java.math.BigDecimal;
import java.util.Date;

public interface AmcSerialDto {
	String getAmc_serial_no();
	String getAmc_no();
	String getFrequency();
	boolean getActive();
	Date getMtc_start_date();
	Date getMtc_end_date();
	BigDecimal getMtc_amount_for_given_frequency_lkr();
}
