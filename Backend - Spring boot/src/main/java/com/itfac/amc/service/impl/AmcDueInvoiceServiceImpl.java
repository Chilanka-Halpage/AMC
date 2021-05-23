package com.itfac.amc.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.dto.DueInvoiceDto;
import com.itfac.amc.entity.AmcDueInvoice;
import com.itfac.amc.repository.AmcDueInvoiceRepositiory;
import com.itfac.amc.service.AmcDueInvoiceService;

@Service
public class AmcDueInvoiceServiceImpl implements AmcDueInvoiceService {

	@Autowired
	private AmcDueInvoiceRepositiory amcDueInvoiceRepositiory;
	
	@Override
	public List<DueInvoiceDto> getAllAmcDueInvoices() {
		List<DueInvoiceDto> amcDueInvoice = amcDueInvoiceRepositiory.getDueInvoices();
		return amcDueInvoice;		
	}

	@Override
	public void addAmcDueInvoice( AmcDueInvoice amcDueInvoice) {	
		amcDueInvoiceRepositiory.save(amcDueInvoice);
	}

	@Override
	public Optional<DueInvoiceDto> getAmcDueInvoiceById(int id) {
		return amcDueInvoiceRepositiory.getiddueinvoice(id);
	}

	@Override
	public void deleteDueInvoice(int id) {
		amcDueInvoiceRepositiory.deleteById(id);
		
	}

	@Override
	public void updateAmcDueInvoice( AmcDueInvoice amcDueInvoice) {
		amcDueInvoiceRepositiory.save(amcDueInvoice);
	}

	@Override
	public List<DueInvoiceDto> settled() {
		return amcDueInvoiceRepositiory.settled();
	}

	@Override
	public List<DueInvoiceDto> getduebyClientId(String user_id) {
		
		return amcDueInvoiceRepositiory.getduebyClientId(user_id);
	}

}
