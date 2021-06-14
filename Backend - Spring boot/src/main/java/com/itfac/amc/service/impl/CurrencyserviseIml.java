package com.itfac.amc.service.impl;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.entity.Currency;
import com.itfac.amc.repository.CurrencyRepository;
import com.itfac.amc.service.Currencyservice;

@Service
public class CurrencyserviseIml implements Currencyservice{
	
	@Autowired
	CurrencyRepository currencyRepository;
	
	@Override
	public List<Currency> getAllCurrency() {
		List<Currency> findAllCurrency = currencyRepository.findAll();
		return findAllCurrency;
	}
	
	@Override
	public Optional<Currency> getCurrencyById(int id) {
		Optional<Currency> findByIdCurrency = currencyRepository.findById(id);
		return findByIdCurrency;
	}

	@Override
	public void deleteCurrency(int id) {
		currencyRepository.deleteById(id);
	}
	
	public Currency addCurrency(HttpServletRequest httpServletRequest, Currency currency){
		String ipAddress = httpServletRequest.getRemoteAddr();
		currency.setSavedIp(ipAddress);
		return currencyRepository.save(currency);
	}

	@Override
	public List<Currency> getActivecurrencies() {
		return currencyRepository.getActivecurrencies();
	}
	
	@Override
	public boolean doesCurrencyExists(String currencyName) {
		return currencyRepository.existsByCurrencyName(currencyName);
	}

	@Override
	public Currency updateCurrency(HttpServletRequest httpServletRequest, Currency currency) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		currency.setSavedIp(ipAddress);
		return currencyRepository.save(currency);
	}

}
