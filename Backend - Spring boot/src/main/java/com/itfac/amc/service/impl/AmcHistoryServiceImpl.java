package com.itfac.amc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.entity.AmcHistory;
import com.itfac.amc.repository.AmcHistoryRepository;
import com.itfac.amc.service.AmcHistoryService;

@Service
public class AmcHistoryServiceImpl implements AmcHistoryService {

	@Autowired
	AmcHistoryRepository amcHistoryRepository; 
	
	@Override
	public List<AmcHistory> getHistoryByAmcNo(String amcNo) {
		return amcHistoryRepository.findByAmcNo(amcNo);		
	}

}
