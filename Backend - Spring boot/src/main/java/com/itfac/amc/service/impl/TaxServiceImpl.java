package com.itfac.amc.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.entity.Tax;
import com.itfac.amc.repository.TaxRepository;
import com.itfac.amc.service.TaxService;

@Service
public class TaxServiceImpl implements TaxService{
 
	@Autowired
	private TaxRepository taxRepository;
	
	@Override
	public List<Tax> getAllTax() {
		List<Tax> tax = taxRepository.findAll();
		return tax;
		
	}
	
	public Tax addTax(HttpServletRequest httpServletRequest, Tax tax){
		String ipAddress = httpServletRequest.getRemoteAddr();
		tax.setSavedIp(ipAddress);
		return taxRepository.save(tax);
	}

	@Override
	public void deleteTax(int id) {
		taxRepository.deleteById(id);
	}
	
	public Optional<Tax> findtax(int taxId) {
      return taxRepository.findById(taxId); 
	}

	@Override
	public Optional<Tax> getTaxById(int id) {
		Optional<Tax> findByIdTax = taxRepository.findById(id);
		return findByIdTax;
	}
	
	@Override
	public Tax updateTax(HttpServletRequest httpServletRequest, Tax tax) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		tax.setSavedIp(ipAddress);
		return taxRepository.save(tax);
	}

	@Override
	public List<Tax> getActiveTax() {		
		return taxRepository.getActivetax();
	}

	@Override
	public boolean doesTaxExists(String taxName) {
		return taxRepository.existsByTaxName(taxName);
	}

	@Override
	public BigDecimal gettaxRate(int taxId) {
		return taxRepository.gettaxRate(taxId);
	}
}




