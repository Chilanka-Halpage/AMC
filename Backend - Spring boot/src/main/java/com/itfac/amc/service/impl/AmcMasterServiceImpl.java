package com.itfac.amc.service.impl;

import java.time.Year;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.entity.AmcMaster;
import com.itfac.amc.repository.AmcMasterRepository;
import com.itfac.amc.repository.ClientRepository;
import com.itfac.amc.service.AmcService;

@Service
public class AmcMasterServiceImpl implements AmcService {

	@Autowired
	AmcMasterRepository amcMasterRepository;
	@Autowired
	ClientRepository clientRepository;

	@Override
	@Transactional
	public HashMap<String, String> addNewAmcByClientId(HttpServletRequest httpServletRequest ,AmcMaster amc, int clientId) throws ResourceNotFoundException {
		clientRepository.findById(clientId).map(client -> {
			amc.setClient(client);
			return client;
		}).orElseThrow(() -> new ResourceNotFoundException("Client Id: " +  clientId +" not found"));
		String ipAddress = httpServletRequest.getRemoteAddr();
		String currentYear = String.valueOf(Year.now().getValue());
		String receivedLastNo = amcMasterRepository.getAmcLastNo(currentYear);
		int lastNo = 0;
		if(receivedLastNo != null) {
			lastNo = (Integer.parseInt(receivedLastNo)) + 1;
		}
		else {
			lastNo += 1; 
		}
		String amcNo = currentYear + lastNo;
		amc.setAmcNo(amcNo);
		amc.setSavedIp(ipAddress);
		amcMasterRepository.setAmcNo(currentYear, lastNo);
		AmcMaster returnedAmc = amcMasterRepository.save(amc);
		HashMap<String, String> map = new HashMap<>();
		if(returnedAmc != null) {
			map.put("AmcNo", returnedAmc.getAmcNo());
			map.put("Messege", "Saved Successfully");
			return map;
		}
		map.put("Message", "Saving Failed");
		return map;
	}

}
