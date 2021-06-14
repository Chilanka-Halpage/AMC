package com.itfac.amc.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.itfac.amc.reportData.AllAmcs;
import com.itfac.amc.reportData.ClientAmc;
import com.itfac.amc.reportData.ClientDetails;
import com.itfac.amc.reportData.ClientPaymentsDetails;
import com.itfac.amc.reportData.ExpiredAmc;
import com.itfac.amc.reportData.FullDetailsReport;
import com.itfac.amc.reportData.GetClientAmc;
import com.itfac.amc.reportData.GetInvoice;
import com.itfac.amc.reportData.PaymentReport;
import com.itfac.amc.reportData.RenewalAmcs;
import com.itfac.amc.reportData.RenewedAmcs;

public interface ReportService {

	public List<ClientDetails> getAllClientDetails(LocalDate date1, LocalDate date2);

	//public List<AllAmcs> getAllAmc(LocalDate Date1, LocalDate Date2);

	public List<RenewedAmcs> getRenewedAmcs(LocalDate Date1, LocalDate Date2);

	public List<ExpiredAmc> getExpiredAmcs(LocalDate Date1, LocalDate Date2);

	public List<RenewalAmcs> getRenewalAmcs(LocalDate Date1, LocalDate Date2);

	public List<FullDetailsReport> getFullDetails(LocalDate Date1, LocalDate Date2);

	public List<ClientAmc> clientAmcReport(String user_id);

	public List<PaymentReport> paymentReport(LocalDate Date1, LocalDate Date2, String category);

	public List<ClientPaymentsDetails> ClientPaymentsReport(String user_id);

	public List<Map<String, Object>> QuarterWiseRevenue(LocalDate date1, String caegory);
	
	//all amcs ctegory wise report
	public List<AllAmcs> getAllAmcCtgWise(LocalDate Date1, LocalDate Date2,String category);

	List<GetClientAmc> getclientAmc(String amc_no) throws Exception;
	
	List<GetInvoice> getInvoiceByIdAndDate(String amc_no, LocalDate pi_date ) throws Exception;

	BigDecimal getRevanue(LocalDate date1,LocalDate date2);
	
	String getRenewalAmc(LocalDate Date1,LocalDate Date2, String user_id);
}
