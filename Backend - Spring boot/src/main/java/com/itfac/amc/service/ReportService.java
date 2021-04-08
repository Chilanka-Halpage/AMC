package com.itfac.amc.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.reportData.AllAmcs;
import com.itfac.amc.reportData.AllClientDetails;
import com.itfac.amc.reportData.ClientDetails;
import com.itfac.amc.reportData.GetAllAmcs;
import com.itfac.amc.repository.AmcMasterRepository;
import com.itfac.amc.repository.AmcSerialRepository;
import com.itfac.amc.repository.ClientRepository;

@Service
public class ReportService {

	@Autowired
	AmcSerialRepository amcSerialRepository;

	@Autowired
	AmcMasterRepository amcMasterRepository;

	@Autowired
	ClientRepository clientRepository;

	// get All AMCs details report
	public List<GetAllAmcs> getAllAmcsBetweenDates(Date Date1, Date Date2) {
		return amcSerialRepository.getAllAmcsBetweenDates(Date1, Date2);
	}

	// client details report -only one client
	public List<ClientDetails> getClientDetailsByName(String client_name) {
		return clientRepository.getClientDetailsByName(client_name);
	}

	// All client details report between two dates
	public List<AllClientDetails> getAllClientDetailsBetweenDates(Date Date1, Date Date2) {
		return clientRepository.getAllClientDetailsBetweenDates(Date1, Date2);
	}

	public List<AllAmcs> getAllAmc(LocalDate Date1, LocalDate Date2) {
		return amcSerialRepository.getAllAmc(Date1, Date2);
	}

	public List<AllAmcs> getAllAmcByNo(String amc_no) {
		return amcSerialRepository.getAllAmcByNo(amc_no);
	}

}
