package com.itfac.amc.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.itfac.amc.reportData.UserDetails;
import com.itfac.amc.repository.UserRepository;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class UsersJasperService {
	@Autowired
	private UserRepository userRepository;

	public String exportReport(String reportFormat) throws FileNotFoundException, JRException {
		List<UserDetails> report1 = userRepository.getUserDetails();
		// load file
		File file = ResourceUtils.getFile("classpath:jasperReports/Users.jrxml");
		JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(report1);
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("createdBy", "Java");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		if (reportFormat.equalsIgnoreCase("html")) {
			JasperExportManager.exportReportToHtmlFile(jasperPrint,
					"C:\\Users\\User\\Desktop\\New folder\\report1.html");
		}
		if (reportFormat.equalsIgnoreCase("pdf")) {
			JasperExportManager.exportReportToPdfFile(jasperPrint, "C:\\Users\\User\\Desktop\\New folder\\report1.pdf");
		}
		return "Report1 generated";
	}
}
