package com.itfac.amc.service.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
	
	private final String url = "C:\\Users\\User\\Desktop\\New folder\\";
	
	
	//view pdf
	@Override
	public ResponseEntity<Resource> viewPdf(String userId, HttpServletRequest request)throws Exception 
	{
		File file = new File(url+userId+".pdf");
    	Path path = Paths.get(file.getAbsolutePath());
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF)
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline;fileName=" + resource.getFilename()).body(resource);
    }
	
	//all amcs report
	@Override
	public ResponseEntity<String> AllAmcsJr(LocalDate Date1,LocalDate Date2,String userId) throws FileNotFoundException, JRException {
		List<AllAmcs> AllAmcs=amcSerialRepository.getAllAmc(Date1,Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/AllAmcs.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(AllAmcs);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "test");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint, url+userId+".pdf");
				return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	//renewal amcs report
	@Override
	public ResponseEntity<String> RenewalAmcsJr(LocalDate Date1,LocalDate Date2,String userId) throws FileNotFoundException, JRException {
		List<RenewalAmcs> RenewalAmcs=amcSerialRepository.getRenewalAmcs(Date1, Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/RenewalAmcs.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(RenewalAmcs);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,url+userId+".pdf");
		
				return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	//renewed amcs report
	@Override
	public ResponseEntity<String> RenewedAmcsJr(LocalDate Date1,LocalDate Date2,String userId) throws FileNotFoundException, JRException {
		List<RenewedAmcs> RenewedAmcs=amcSerialRepository.getRenewedAmcs(Date1, Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/RenewedAmcs.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(RenewedAmcs);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,url+userId+".pdf");
		
				return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
	//Expired amcs report
	@Override
	public ResponseEntity<String> ExpiredAmcsJr(LocalDate Date1,LocalDate Date2,String userId) throws FileNotFoundException, JRException {
		List<ExpiredAmc> ExpiredAmcs=amcSerialRepository.getExpiredAmcs(Date1, Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/ExpiredAmcs.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(ExpiredAmcs);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint, url+userId+".pdf");
		
				return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
	//Full details report
	@Override
	public ResponseEntity<String> FullDetailsJr(LocalDate Date1,LocalDate Date2,String userId) throws JRException, IOException {
		List<FullDetailsReport> fullDetailsReport=amcSerialRepository.getFullDetails(Date1, Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/FullDetailsReport.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(fullDetailsReport);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
			JasperExportManager.exportReportToPdfFile(jasperPrint, url+userId+".pdf");

				return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
	//client details
	@Override
	public ResponseEntity<String> ClientDetailsJr(LocalDate Date1,LocalDate Date2,String userId) throws FileNotFoundException, JRException {
		List<ClientDetails> clientDetails=clientRepository.getAllClientDetails(Date1, Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/ClientDetails.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(clientDetails);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,url+userId+".pdf");
		
				return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	@Override
	public ResponseEntity<String> PaymentReportJr(LocalDate Date1,LocalDate Date2,String userId) throws FileNotFoundException, JRException{
		List<PaymentReport> paymentReports=amcSerialRepository.paymentsReport(Date1, Date2);
		File file=ResourceUtils.getFile("classpath:jasperReports/PaymentReport.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(paymentReports);
		Map<String, Object> parameters = new HashMap<>();
		 parameters.put("date1", Date1);
		 parameters.put("date2", Date2);
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,url+userId+".pdf");
		return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
	// AMC report for client--------------------------------------
	@Override
	public ResponseEntity<String> ClientAmc(String userId) throws FileNotFoundException, JRException{
		List<ClientAmc> paymentReports=amcSerialRepository.ClientAmcReport(userId);
		File file=ResourceUtils.getFile("classpath:jasperReports/ClientAmc.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(paymentReports);
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,url+userId+".pdf");
		return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
	//Payment Report for client------------------------------------------------
	@Override
	public ResponseEntity<String> ClientPaymentReport(String userId) throws FileNotFoundException, JRException{
		List<ClientPaymentsDetails> paymentReports=amcSerialRepository.ClientPaymentsReport(userId);
		File file=ResourceUtils.getFile("classpath:jasperReports/ClientPayment.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(paymentReports);
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,url+userId+".pdf");
		return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
	@Override
	public ResponseEntity<String> QuarterWiseRevenueJrReport(LocalDate date1,String userId) throws FileNotFoundException, JRException{
		LocalDate date2 = date1.plusMonths(3);
		BigDecimal q1=amcSerialRepository.getRevanue(date1, date2);
		LocalDate date3 = date2.plusMonths(3);
		BigDecimal q2=amcSerialRepository.getRevanue(date2, date3);
		LocalDate date4 = date3.plusMonths(3);
		BigDecimal q3=amcSerialRepository.getRevanue(date3, date4);
		LocalDate date5 = date4.plusMonths(3);
		BigDecimal q4=amcSerialRepository.getRevanue(date4, date5);
		System.out.println(date1);
		System.out.println(date2);
		System.out.println(date3);
		System.out.println(date4);
		System.out.println(date5);
//		List<Map<String, Object>> report = new ArrayList<>();
		Map<String, Object> parameter = new HashMap<>();
		parameter.put("q1", q1);
		parameter.put("q2", q2);
		parameter.put("q3", q3);
		parameter.put("q4", q4);
		List<Map<String, Object>> revenue=new ArrayList<>();
		revenue.add(parameter);
		File file=ResourceUtils.getFile("classpath:jasperReports/QuarterWiseReport.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(revenue);
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,url+userId+".pdf");
		return ResponseEntity.status(HttpStatus.OK).body("Report generated");
	}
	
}
