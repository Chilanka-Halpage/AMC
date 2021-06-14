package com.itfac.amc.service.impl;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.dto.AmcFullDataDto;
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
		List<ClientDetails> clientDetailsReport= clientRepository.getAllClientDetails(date1, date2);
		return clientDetailsReport;
	}
	
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
	public List<GetInvoice> getInvoiceByIdAndDate(String amc_no, LocalDate pi_date) throws Exception {
		List<GetInvoice> invoice = proformaInvoiceRepository.getInvoiceByIdAndDate(amc_no, pi_date);
		return invoice;
	}

	
	//Quarter wise report
	public BigDecimal getRevanue(LocalDate date1, LocalDate date2) {
		return amcSerialRepository.getRevanue(date1, date2);
	}
	public BigDecimal getRevanueCtgWise(LocalDate date1, LocalDate date2, String category) {
		return amcSerialRepository.getRevanueCtgWise(date1, date2, category);
	}

	@Override
	public List<Map<String, Object>> QuarterWiseRevenue(LocalDate date1, String category){
		LocalDate date2 = date1.plusMonths(3);
		date2 = date2.minusDays(1);
		LocalDate date3 = date1.plusMonths(6);
		date3 = date3.minusDays(1);
		LocalDate date4 = date1.plusMonths(9);
		date4 = date4.minusDays(1);
		LocalDate date5 = date1.plusMonths(12);
		date5 = date5.minusDays(1);
		System.out.println(date1);
		System.out.println(date2);
		System.out.println(date3);
		System.out.println(date4);
		System.out.println(date5);
		if(category.equals("all")) {
		BigDecimal q1 = getRevanue(date1,date2);
		BigDecimal q2 = getRevanue(date2,date3);
		BigDecimal q3 = getRevanue(date3,date4);
		BigDecimal q4 = getRevanue(date4,date5);
		if(q1==null) {
			q1=BigDecimal.ZERO;
		}
		if(q2==null) {
			q2=BigDecimal.ZERO;
		}
		if(q3==null) {
			q3=BigDecimal.ZERO;
		}
		if(q4==null) {
			q4=BigDecimal.ZERO;
		}
		BigDecimal total = q1.add(q2).add(q3).add(q4);
		Map<String, Object> parameters = new HashMap<>();	
		parameters.put("quarter1", q1);
		parameters.put("quarter2", q2);
		parameters.put("quarter3", q3);
		parameters.put("quarter4", q4);
		parameters.put("total", total);
		List<Map<String, Object>> revenue=new ArrayList<>();
		revenue.add(parameters);
		return revenue;}
		else {
			BigDecimal q1 = getRevanueCtgWise(date1,date2,category);
			BigDecimal q2 = getRevanueCtgWise(date2,date3,category);
			BigDecimal q3 = getRevanueCtgWise(date3,date4,category);
			BigDecimal q4 = getRevanueCtgWise(date4,date5,category);
			if(q1==null) {
				q1=BigDecimal.ZERO;
			}
			if(q2==null) {
				q2=BigDecimal.ZERO;
			}
			if(q3==null) {
				q3=BigDecimal.ZERO;
			}
			if(q4==null) {
				q4=BigDecimal.ZERO;
			}
			BigDecimal total = q1.add(q2).add(q3).add(q4);
			Map<String, Object> parameters = new HashMap<>();	
			parameters.put("quarter1", q1);
			parameters.put("quarter2", q2);
			parameters.put("quarter3", q3);
			parameters.put("quarter4", q4);
			parameters.put("total", total);
			parameters.put("date", date5);
			List<Map<String, Object>> revenue=new ArrayList<>();
			revenue.add(parameters);
			return revenue;}
		}

	//renewel amc count for client
	@Override
	public String getRenewalAmc(LocalDate Date1, LocalDate Date2, String user_id) {
		return  amcSerialRepository.getRenewalAmc(Date1, Date2, user_id);
	}
}
