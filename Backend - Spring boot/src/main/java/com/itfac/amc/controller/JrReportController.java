package com.itfac.amc.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.repository.AmcSerialRepository;
import com.itfac.amc.service.JasperReportService;

import net.sf.jasperreports.engine.JRException;

@CrossOrigin(origins = "*")
@RestController

public class JrReportController {

	@Autowired
	private JasperReportService jasperReportService;
	@Autowired
	AmcSerialRepository amcSerialRepository;

	//All AMCs report
	@GetMapping("/AllAmcsJrReport/{Date1}/{Date2}")
	public ResponseEntity<String> AllAmcsJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return jasperReportService.AllAmcsJr(Date1, Date2);
	}
	
	//Renewal AMCs report
	@GetMapping("/RenewalAmcsJrReport/{Date1}/{Date2}")
	public ResponseEntity<String> RenewalAmcsJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return jasperReportService.RenewalAmcsJr(Date1, Date2);
	}
	
	//Renewed AMCs report
	@GetMapping("/RenewedAmcsJrReport/{Date1}/{Date2}")
	public ResponseEntity<String> RenewedAmcsJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return jasperReportService.RenewedAmcsJr(Date1, Date2);
	}
	
	//Expired AMCs report
	@GetMapping("/ExpiredAmcsJrReport/{Date1}/{Date2}")
	public ResponseEntity<String> ExpiredAmcsJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return jasperReportService.ExpiredAmcsJr(Date1, Date2);
	}
	
	//Full Details Report
	@GetMapping("/FullDetailsJrReport/{Date1}/{Date2}")
	public ResponseEntity<String> FullDetailsJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws JRException, IOException {
		return jasperReportService.FullDetailsJr(Date1, Date2);
	}
	
	//Client Details Report
	@GetMapping("/ClientDetailsJrReport/{Date1}/{Date2}")
	public ResponseEntity<String> ClientDetailsJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws JRException, IOException {
		return jasperReportService.ClientDetailsJr(Date1, Date2);
	}
	
	//Payment Report
	@GetMapping("/PaymentsJrReport/{Date1}/{Date2}")
	public ResponseEntity<String> PaymentReportJr(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return jasperReportService.PaymentReportJr(Date1, Date2);
	}
	
	//AMC Report for client
	@GetMapping("/ClientAmcReport/{cId}")
	public ResponseEntity<String> ClientAmc(
			@PathVariable(value = "cId") String cId)
			throws FileNotFoundException, JRException {
		return jasperReportService.ClientAmc(cId);
	}
	
	//Payment report for client
	@GetMapping("/ClientPaymentsJrReport/{cId}")
	public ResponseEntity<String> ClientPaymentReport(
			@PathVariable(value = "cId") String cId)
			throws FileNotFoundException, JRException {
		return jasperReportService.ClientPaymentReport(cId);
	}

}
