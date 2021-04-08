package com.itfac.amc.controller;

import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.reportData.AllAmcs;
import com.itfac.amc.reportData.AllClientDetails;
import com.itfac.amc.reportData.ClientDetails;
import com.itfac.amc.service.ReportService;

import net.sf.jasperreports.engine.JRException;

@RestController
@CrossOrigin("*")
public class ReportController {

	@Autowired
	private ReportService reportService;

	// client details report -only one client
	@GetMapping("report/Clientdetails/{client_name}")
	public List<ClientDetails> getClientDetailsByName(@PathVariable String client_name) {
		return reportService.getClientDetailsByName(client_name);
	}

	// All client details report between two dates
	@GetMapping("report/AllClients/{Date1},{Date2}")
	public List<AllClientDetails> getAllClientDetailsBetweenDates(@PathVariable Date Date1, @PathVariable Date Date2) {
		return reportService.getAllClientDetailsBetweenDates(Date1, Date2);
	}

	// All AMC details report
	@GetMapping("/AllAmcs/{Date1}/{Date2}")
	public List<AllAmcs> getAllAmc(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2)
			throws FileNotFoundException, JRException {
		return reportService.getAllAmc(Date1, Date2);
	}

}
