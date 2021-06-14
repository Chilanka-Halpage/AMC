package com.itfac.amc.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;

@Service
public interface JasperReportService {	
	public ResponseEntity<Resource> viewPdf(String userId, HttpServletRequest request)throws Exception;
	//all amcs category wise report
	public ResponseEntity<String> getAllAmcCtgWiseJr(LocalDate date1,LocalDate date2,String category, String userId) throws FileNotFoundException, JRException;
	//renewal amcs report
	public ResponseEntity<String> RenewalAmcsJr(LocalDate Date1,LocalDate Date2, String userId) throws FileNotFoundException, JRException;
	//renewed amcs report
	public ResponseEntity<String> RenewedAmcsJr(LocalDate Date1,LocalDate Date2, String userId) throws FileNotFoundException, JRException;	
	//Expired amcs report
	public ResponseEntity<String> ExpiredAmcsJr(LocalDate Date1,LocalDate Date2, String userId) throws FileNotFoundException, JRException;	
	//Full details report
	public ResponseEntity<String> FullDetailsJr(LocalDate Date1,LocalDate Date2, String userId) throws JRException, IOException;
	//client details
	public ResponseEntity<String> ClientDetailsJr(LocalDate Date1,LocalDate Date2, String userId) throws FileNotFoundException, JRException, IOException;
	//Payments Report
	public ResponseEntity<String> PaymentReportJr(LocalDate Date1,LocalDate Date2,String category, String userId) throws FileNotFoundException, JRException;
	//AMC report for client
	public ResponseEntity<String> ClientAmc(String userId) throws FileNotFoundException, JRException;
	//Client Payment Report
	public ResponseEntity<String> ClientPaymentReport(String userId) throws FileNotFoundException, JRException;
	//Quarter wise revenue Report
	public ResponseEntity<String> QuarterWiseRevenueJrReport(LocalDate date1, String categoty, String userId) throws FileNotFoundException, JRException;


}
