package com.itfac.amc.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.itfac.amc.reportData.AllAmcs;
import com.itfac.amc.repository.AmcSerialRepository;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class AllAmcsJasperService {

	@Autowired
	private AmcSerialRepository amcSerialRepository;
	
	public String exportReport1(String reportformat, LocalDate Date1,LocalDate Date2) throws FileNotFoundException, JRException {
		List<AllAmcs> employees=amcSerialRepository.getAllAmc(Date1,Date2);
		//load file
		File file=ResourceUtils.getFile("classpath:jasperReports/AllAmcs.jrxml");
		JasperReport jasperReport=JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(employees);
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		if(reportformat.equalsIgnoreCase("html")) {
			JasperExportManager.exportReportToHtmlFile(jasperPrint,"C:\\Users\\User\\Desktop\\New folder\\AllAmcs.html");
		}
		if(reportformat.equalsIgnoreCase("pdf")) {
			JasperExportManager.exportReportToPdfFile(jasperPrint, "C:\\Users\\User\\Desktop\\New folder\\AllAmcs.pdf");
		}
				return "Report generated";
	}
}
