package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.itfac.amc.entity.Currency;

public interface Currencyservice {

	List<Currency> getAllCurrency();

	Optional<Currency> getCurrencyById(int id);

	void deleteCurrency(int id);

	Currency addCurrency(HttpServletRequest httpServletRequest, Currency currency);

	List<Currency> getActivecurrencies();

	boolean doesCurrencyExists(String name);

	Currency updateCurrency(HttpServletRequest httpServletRequest, Currency currency);

}
