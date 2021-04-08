package com.itfac.amc.controller;

import java.io.FileNotFoundException;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.service.AllAmcsJasperService;
import com.itfac.amc.service.UsersJasperService;

import net.sf.jasperreports.engine.JRException;

@RestController
@CrossOrigin("*")
public class JrReportController {

	@Autowired
	private AllAmcsJasperService allAmcsJasperService;
	@Autowired
	private UsersJasperService usersJasperService;

	// all AMC details Jasper report
	@GetMapping("/AllAmcsJReport/{format}/{Date1}/{Date2}")
	public String generateReport(@PathVariable String format,
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return allAmcsJasperService.exportReport1(format, Date1, Date2);
	}

	@GetMapping("/users/{format}")
	public String generateReport1(@PathVariable String format) throws FileNotFoundException, JRException {
		return usersJasperService.exportReport(format);
	}

}
