package com.itfac.amc.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.repository.AmcSerialRepository;
import com.itfac.amc.service.JasperReportService;

import net.sf.jasperreports.engine.JRException;

@RestController
@RequestMapping("/jrReport")
public class JrReportController {

	@Autowired
	private JasperReportService jasperReportService;
	@Autowired
	AmcSerialRepository amcSerialRepository;

	@GetMapping("/viewPdf/{userId}")
	public ResponseEntity<Resource> viewPdf(@PathVariable(value = "userId") String userId, HttpServletRequest request)
			throws Exception {
		return jasperReportService.viewPdf(userId, request);
	}

	// All AMCs report
	@GetMapping("/allAmcCtgWiseJr/{Date1}/{Date2}/{category}/{userId}")
	public ResponseEntity<String> getAllAmcCtgWiseJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2,
			@PathVariable(value = "category") String category,
			@PathVariable(value = "userId") String userId) throws FileNotFoundException, JRException {
		return jasperReportService.getAllAmcCtgWiseJr(Date1, Date2, category, userId);
	}

	// Renewal AMCs report
	@GetMapping("/RenewalAmcsJrReport/{Date1}/{Date2}/{userId}")
	public ResponseEntity<String> RenewalAmcsJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2,
			@PathVariable(value = "userId") String userId) throws FileNotFoundException, JRException {
		return jasperReportService.RenewalAmcsJr(Date1, Date2, userId);
	}

	// Renewed AMCs report
	@GetMapping("/RenewedAmcsJrReport/{Date1}/{Date2}/{userId}")
	public ResponseEntity<String> RenewedAmcsJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2,
			@PathVariable(value = "userId") String userId) throws FileNotFoundException, JRException {
		return jasperReportService.RenewedAmcsJr(Date1, Date2, userId);
	}

	// Expired AMCs report
	@GetMapping("/ExpiredAmcsJrReport/{Date1}/{Date2}/{userId}")
	public ResponseEntity<String> ExpiredAmcsJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2,
			@PathVariable(value = "userId") String userId) throws FileNotFoundException, JRException {
		return jasperReportService.ExpiredAmcsJr(Date1, Date2, userId);
	}

	// Full Details Report
	@GetMapping("/FullDetailsJrReport/{Date1}/{Date2}/{userId}")
	public ResponseEntity<String> FullDetailsJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2,
			@PathVariable(value = "userId") String userId) throws JRException, IOException {
		return jasperReportService.FullDetailsJr(Date1, Date2, userId);
	}

	// Client Details Report
	@GetMapping("/ClientDetailsJrReport/{Date1}/{Date2}/{userId}")
	public ResponseEntity<String> ClientDetailsJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2,
			@PathVariable(value = "userId") String userId) throws JRException, IOException {
		return jasperReportService.ClientDetailsJr(Date1, Date2, userId);
	}

	// Payment Report
	@GetMapping("/PaymentsJrReport/{Date1}/{Date2}/{category}/{userId}")
	public ResponseEntity<String> PaymentReportJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2,
			@PathVariable(value = "category") String category,
			@PathVariable(value = "userId") String userId) throws FileNotFoundException, JRException {
		return jasperReportService.PaymentReportJr(Date1, Date2,category, userId);
	}

	// AMC Report for client
	@GetMapping("/client/ClientAmcReport/{userId}")
	public ResponseEntity<String> ClientAmc(@PathVariable(value = "userId") String userId)
			throws FileNotFoundException, JRException {
		return jasperReportService.ClientAmc(userId);
	}

	// Payment report for client
	@GetMapping("/client/ClientPaymentsJrReport/{userId}")
	public ResponseEntity<String> ClientPaymentReport(@PathVariable(value = "userId") String userId)
			throws FileNotFoundException, JRException {
		return jasperReportService.ClientPaymentReport(userId);
	}

	//quarter wise revenue details
	@GetMapping("/QuarterWiseRevenueJrReport/{date1}/{category}/{userId}")
	public ResponseEntity<String> QuarterWiseReport(
			@PathVariable(value = "date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date1,
			@PathVariable(value = "category") String category,
			@PathVariable(value = "userId") String userId) throws FileNotFoundException, JRException {
		return jasperReportService.QuarterWiseRevenueJrReport(date1, category, userId);
	}
}
