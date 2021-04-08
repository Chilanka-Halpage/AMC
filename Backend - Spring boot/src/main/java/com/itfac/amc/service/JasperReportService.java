package com.itfac.amc.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;

@Service
public interface JasperReportService {	
	//all amcs report
	public ResponseEntity<String> AllAmcsJr( LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException; 
	//renewal amcs report
	public ResponseEntity<String> RenewalAmcsJr(LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException;
	//renewed amcs report
	public ResponseEntity<String> RenewedAmcsJr(LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException;	
	//Expired amcs report
	public ResponseEntity<String> ExpiredAmcsJr(LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException;	
	//Full details report
	public ResponseEntity<String> FullDetailsJr(LocalDate Date1,LocalDate Date2) throws JRException, IOException;
	//client details
	public ResponseEntity<String> ClientDetailsJr(LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException, IOException;
	//Payments Report
	public ResponseEntity<String> PaymentReportJr(LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException;
	//AMC report for client
	public ResponseEntity<String> ClientAmc(String cId) throws FileNotFoundException, JRException;
	//Client Payment Report
	public ResponseEntity<String> ClientPaymentReport(String cId) throws FileNotFoundException, JRException;


}
