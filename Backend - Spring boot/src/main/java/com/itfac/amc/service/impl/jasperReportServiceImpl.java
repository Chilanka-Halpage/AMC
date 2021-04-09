package com.itfac.amc.service.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.itfac.amc.reportData.AllAmcs;
import com.itfac.amc.reportData.ClientAmc;
import com.itfac.amc.reportData.ClientDetails;
import com.itfac.amc.reportData.ClientPaymentsDetails;
import com.itfac.amc.reportData.ExpiredAmc;
import com.itfac.amc.reportData.FullDetailsReport;
import com.itfac.amc.reportData.PaymentReport;
import com.itfac.amc.reportData.RenewalAmcs;
import com.itfac.amc.reportData.RenewedAmcs;
import com.itfac.amc.repository.AmcSerialRepository;
import com.itfac.amc.repository.ClientRepository;
import com.itfac.amc.service.JasperReportService;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class jasperReportServiceImpl implements JasperReportService{
	@Autowired
	private AmcSerialRepository amcSerialRepository;
	@Autowired
	private ClientRepository clientRepository;
	
	//all amcs report
	@Override
	public ResponseEntity<String> AllAmcsJr(LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException {
		List<AllAmcs> AllAmcs=amcSerialRepository.getAllAmc(Date1,Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/AllAmcs.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(AllAmcs);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "test");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint, "F:\\test\\my-app\\src\\assets\\AllAmcJr.pdf");
				return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	//renewal amcs report
	@Override
	public ResponseEntity<String> RenewalAmcsJr(LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException {
		List<RenewalAmcs> RenewalAmcs=amcSerialRepository.getRenewalAmcs(Date1, Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/RenewalAmcs.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(RenewalAmcs);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint, "F:\\test\\my-app\\src\\assets\\renewalAmcs.pdf");
		
				return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	//renewed amcs report
	@Override
	public ResponseEntity<String> RenewedAmcsJr(LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException {
		List<RenewedAmcs> RenewedAmcs=amcSerialRepository.getRenewedAmcs(Date1, Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/RenewedAmcs.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(RenewedAmcs);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint, "F:\\test\\my-app\\src\\assets\\renewedAmcs.pdf");
		
				return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
	//Expired amcs report
	@Override
	public ResponseEntity<String> ExpiredAmcsJr(LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException {
		List<ExpiredAmc> ExpiredAmcs=amcSerialRepository.getExpiredAmcs(Date1, Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/ExpiredAmcs.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(ExpiredAmcs);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint, "F:\\test\\my-app\\src\\assets\\ExpiredAmcs.pdf");
		
				return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
	//Full details report
	@Override
	public ResponseEntity<String> FullDetailsJr(LocalDate Date1,LocalDate Date2) throws JRException, IOException {
		List<FullDetailsReport> fullDetailsReport=amcSerialRepository.getFullDetails(Date1, Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/FullDetailsReport.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(fullDetailsReport);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
			JasperExportManager.exportReportToPdfFile(jasperPrint, "F:\\test\\my-app\\src\\assets\\FullDetails.pdf");

				return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
	//client details
	@Override
	public ResponseEntity<String> ClientDetailsJr(LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException {
		List<ClientDetails> clientDetails=clientRepository.getAllClientDetails(Date1, Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/ClientDetails.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(clientDetails);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,"F:\\test\\my-app\\src\\assets\\ClientDetails.pdf");
		
				return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	@Override
	public ResponseEntity<String> PaymentReportJr(LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException{
		List<PaymentReport> paymentReports=amcSerialRepository.paymentsReport(Date1, Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/ClientDetails.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(paymentReports);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,"F:\\test\\my-app\\src\\assets\\PaymentReport.pdf");
		return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
	// AMC report for client--------------------------------------
	@Override
	public ResponseEntity<String> ClientAmc(String cId) throws FileNotFoundException, JRException{
		List<ClientAmc> paymentReports=amcSerialRepository.ClientAmcReport(cId);
		File file=ResourceUtils.getFile("classpath:jasperReports/ClientAmc.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(paymentReports);
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,"F:\\test\\my-app\\src\\assets\\ClientAmc.pdf");
		return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
	//Payment Report for client------------------------------------------------
	public ResponseEntity<String> ClientPaymentReport(String cId) throws FileNotFoundException, JRException{
		List<ClientPaymentsDetails> paymentReports=amcSerialRepository.ClientPaymentsReport(cId);
		File file=ResourceUtils.getFile("classpath:jasperReports/ClientPayment.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(paymentReports);
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,"F:\\test\\my-app\\src\\assets\\PaymentReport.pdf");
		return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
}
