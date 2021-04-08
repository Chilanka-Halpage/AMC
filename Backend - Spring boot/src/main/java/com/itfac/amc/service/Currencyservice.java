package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import com.itfac.amc.entity.Currency;


public interface Currencyservice {

	List<Currency> getAllCurrency();

	Optional<Currency> getCurrencyById(int id);

	void deleteCurrency(int id);

}
