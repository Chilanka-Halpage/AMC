package com.itfac.amc.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.entity.Tax;
import com.itfac.amc.repository.TaxRepository;
import com.itfac.amc.service.TaxService;

@Service
public class TaxServiceImpl implements TaxService {

	@Autowired
	private TaxRepository taxRepository;

	@Override
	public List<Tax> getAllTax() {
		List<Tax> tax = taxRepository.findAll();
		return tax;

	}

	public Tax addTax(HttpServletRequest httpServletRequest, Tax tax) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		tax.setSavedIp(ipAddress);
		return taxRepository.save(tax);
	}

	@Override
	public void deleteTax(int id) {
		taxRepository.deleteById(id);
	}

}
