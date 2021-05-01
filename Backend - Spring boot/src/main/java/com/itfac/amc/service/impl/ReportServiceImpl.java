package com.itfac.amc.service.impl;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
import com.itfac.amc.reportData.viewLoginDetails;
import com.itfac.amc.repository.AmcMasterRepository;
import com.itfac.amc.repository.AmcSerialRepository;
import com.itfac.amc.repository.ClientRepository;
import com.itfac.amc.repository.LoginDtailsRepository;
import com.itfac.amc.repository.ProformaInvoiceRepository;
import com.itfac.amc.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

	@Autowired
	private LoginDtailsRepository loginDtailsRepository;

	@Autowired
	AmcSerialRepository amcSerialRepository;

	@Autowired
	AmcMasterRepository amcMasterRepository;

	@Autowired
	ClientRepository clientRepository;
	
	@Autowired
	ProformaInvoiceRepository proformaInvoiceRepository;

	// All client details report between two dates
	@Override
	public List<ClientDetails> getAllClientDetails(LocalDate date1, LocalDate date2) {
		return clientRepository.getAllClientDetails(date1, date2);
	}

//	// All AMC details report
//	@Override
//	public List<AllAmcs> getAllAmc(LocalDate Date1, LocalDate Date2) {
//		
//	}
	
	// All AMC details category wise report
	@Override
	public List<AllAmcs> getAllAmcCtgWise(LocalDate date1, LocalDate date2,String category){
		System.out.println(category);
		if(category.equals("all")) {
			return amcSerialRepository.getAllAmc(date1, date2);
		}
		else {
			return amcSerialRepository.getAllAmcCtgWise(date1, date2, category);
		}
	}

	// Renewed Amcs
	@Override
	public List<RenewedAmcs> getRenewedAmcs(LocalDate Date1, LocalDate Date2) {
		return amcSerialRepository.getRenewedAmcs(Date1, Date2);
	}

	// Renewal AMCs
	@Override
	public List<RenewalAmcs> getRenewalAmcs(LocalDate Date1, LocalDate Date2) {
		return amcSerialRepository.getRenewalAmcs(Date1, Date2);
	}

	// Expired AMCs
	@Override
	public List<ExpiredAmc> getExpiredAmcs(LocalDate Date1, LocalDate Date2) {
		return amcSerialRepository.getExpiredAmcs(Date1, Date2);
	}

	// Full details report
	@Override
	public List<FullDetailsReport> getFullDetails(LocalDate Date1, LocalDate Date2) {
		return amcSerialRepository.getFullDetails(Date1, Date2);
	}

	// AMC report for client
	@Override
	public List<ClientAmc> clientAmcReport(String user_id) {
		return amcSerialRepository.ClientAmcReport(user_id);
	}

	// Payment Report
	@Override
	public List<PaymentReport> paymentReport(LocalDate date1, LocalDate date2, String category) {
		System.out.println(category);
		if(category.equals("all")) {
		return amcSerialRepository.paymentsReport(date1, date2);
		}
		else {
			return amcSerialRepository.paymentsReportCtgWise(date1, date2, category);
		}
	}

	// Payment Report for client
	@Override
	public List<ClientPaymentsDetails> ClientPaymentsReport(String user_id) {
		return amcSerialRepository.ClientPaymentsReport(user_id);

	}

	//client amc details mobile-----------------------------------
	@Override
	public List<GetClientAmc> getclientAmc(String amc_no) throws Exception {
		List<GetClientAmc> clientAmc = amcMasterRepository.getClientAmcById(amc_no);
		return clientAmc;

	}

	// client invoice mobile-----------------------------------

	@Override
	public List<GetInvoice> getInvoiceById(String amc_no) throws Exception {
		List<GetInvoice> invoice = proformaInvoiceRepository.getInvoiceById(amc_no);
		return invoice;
	}
	
	//Quarter wise report
	public BigDecimal getRevanue(LocalDate date1, LocalDate date2) {
		return amcSerialRepository.getRevanue(date1, date2);
	}

	@Override
	public List<Map<String, Object>> QuarterWiseRevenue(LocalDate date1){
		LocalDate date2 = date1.plusMonths(3);
		BigDecimal q1 = getRevanue(date1,date2);
		LocalDate date3 = date2.plusMonths(3);
		BigDecimal q2 = getRevanue(date2,date3);
		LocalDate date4 = date3.plusMonths(3);
		BigDecimal q3 = getRevanue(date3,date4);
		LocalDate date5 = date4.plusMonths(3);
		BigDecimal q4 = getRevanue(date4,date5);
		System.out.println(q1);
		System.out.println(q2);
		System.out.println(q3);
		System.out.println(q4);
		Map<String, Object> parameters = new HashMap<>();	
		parameters.put("quarter1", q1);
		parameters.put("quarter2", q2);
		parameters.put("quarter3", q3);
		parameters.put("quarter4", q4);
		List<Map<String, Object>> revenue=new ArrayList<>();
		revenue.add(parameters);
		return revenue;
	}
	//renewel amc count
	@Override
	public String getRenewalAmc(LocalDate Date1, LocalDate Date2, String user_id) {
		return  amcSerialRepository.getRenewalAmc(Date1, Date2, user_id);
	}
}
