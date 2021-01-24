package com.example.demo.service_Imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.CurrencyRepository;
import com.example.demo.entity.Currency;
import com.example.demo.service.Currencyservice;

@Service
public class CurrencyserviceImp implements Currencyservice{
	
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

	
}
