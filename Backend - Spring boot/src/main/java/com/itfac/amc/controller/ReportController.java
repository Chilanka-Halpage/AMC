package com.itfac.amc.controller;

import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
import com.itfac.amc.service.ReportService;

import net.sf.jasperreports.engine.JRException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/report")
public class ReportController {

	@Autowired
	private ReportService reportService;

	// All client details report between two dates
	@GetMapping("/AllClients/{Date1}/{Date2}")
	public List<ClientDetails> getAllClientDetailsBetweenDates(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2) {
		return reportService.getAllClientDetails(Date1, Date2);
	}

	// All AMC details report
	@GetMapping("/AllAmcs/{Date1}/{Date2}")
	public List<AllAmcs> getAllAmc(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return reportService.getAllAmc(Date1, Date2);
	}

	// Renewed AMCs
	@GetMapping("/RenewedAmcs/{Date1}/{Date2}")
	public List<RenewedAmcs> getRenewedAmcs(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return reportService.getRenewedAmcs(Date1, Date2);
	}

	// Renewal AMCs
	@GetMapping("/RenewalAmcs/{Date1}/{Date2}")
	public List<RenewalAmcs> getRenewalAmcs(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return reportService.getRenewalAmcs(Date1, Date2);
	}

	// Expired AMCs
	@GetMapping("/ExpiredAmcs/{Date1}/{Date2}")
	public List<ExpiredAmc> getExpiredAmcs(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return reportService.getExpiredAmcs(Date1, Date2);
	}

	// Full details report
	@GetMapping("/FullDeatils/{Date1}/{Date2}")
	public List<FullDetailsReport> getFullDetails(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return reportService.getFullDetails(Date1, Date2);
	}

	// Payments Reports
	@GetMapping("/PaymentReport/{Date1}/{Date2}")
	public List<PaymentReport> paymentReport(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return reportService.paymentReport(Date1, Date2);
	}

	// Client AMC Report
	@GetMapping("/client/ClientAmc/{cId}")
	public List<ClientAmc> clientAmcReport(@PathVariable("cId") String cId) throws FileNotFoundException, JRException {
		return reportService.clientAmcReport(cId);
	}

	// Payment report for client
	@GetMapping("/client/ClientPaymentsReport/{cId}")
	public List<ClientPaymentsDetails> ClientPaymentsReport(@PathVariable("cId") String cId)
			throws FileNotFoundException, JRException {
		return reportService.ClientPaymentsReport(cId);
	}

	// client amc details mobile-----------------------------------
	@GetMapping("getamcreport/{amcNo}")
	ResponseEntity<List<GetClientAmc>> getclientAmc(@PathVariable("amcNo") String amcNo) throws Exception {
		List<GetClientAmc> ClientAmc = reportService.getclientAmc(amcNo);
		return ResponseEntity.status(HttpStatus.OK).body(ClientAmc);

	}

	// client invoice mobile-----------------------------------
	@GetMapping("getinvoicereport/{amcno}")
	ResponseEntity<List<GetInvoice>> getInvoice(@PathVariable("amcno") String id) throws Exception {
		List<GetInvoice> invoice = reportService.getInvoiceById(id);
		return ResponseEntity.status(HttpStatus.OK).body(invoice);
	}
	
	// Quarter wise report
	@GetMapping("/QuarterWiseRevenue/{Date1}")
	public List<Map<String, Object>> QuarterWiseRevenue(@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1)throws FileNotFoundException, JRException {
			
			LocalDate Date2 = Date1.plusMonths(3);
			BigDecimal q1 = reportService.getRevanue(Date1,Date2);
			LocalDate Date3 = Date2.plusMonths(3);
			BigDecimal q2 = reportService.getRevanue(Date2,Date3);
			LocalDate Date4 = Date3.plusMonths(3);
			BigDecimal q3 = reportService.getRevanue(Date3,Date4);
			LocalDate Date5 = Date4.plusMonths(3);
			BigDecimal q4 = reportService.getRevanue(Date4,Date5);
			System.out.println(Date1);
			System.out.println(Date2);
			System.out.println(Date3);
			System.out.println(Date4);
			System.out.println(Date5);
			Map<String, Object> parameters = new HashMap<>();	
			parameters.put("quarter1", q1);
			parameters.put("quarter2", q2);
			parameters.put("quarter3", q3);
			parameters.put("quarter4", q4);
			List<Map<String, Object>> revenue=new ArrayList<>();
			revenue.add(parameters);
			return revenue;
	}

	// amc reminder for dashboard-----------------------------------
	@GetMapping("/AmcReminders/{Date1}/{Date2}")
	public int amcreminder(@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2) {
		List<RenewalAmcs> count = reportService.getRenewalAmcs(Date1, Date2);
		return count.size();
	}

	// expired amc count for dashboard--------------------------------
	@GetMapping("/ExpiredAmcscount/{Date1}/{Date2}")
	public int getExpiredAmcCount(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2) {
		List<ExpiredAmc> count = reportService.getExpiredAmcs(Date1, Date2);
		return count.size();
	}

	// renewed amc count for dashboard--------------------------------
	@GetMapping("/RenewedAmccount/{Date1}/{Date2}")
	public int getRenewedAmcCount(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2) {
		List<RenewedAmcs> count = reportService.getRenewedAmcs(Date1, Date2);
		return count.size();
	}
}
