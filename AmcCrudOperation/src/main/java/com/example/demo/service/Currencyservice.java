package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Currency;

public interface Currencyservice {

	List<Currency> getAllCurrency();

	Optional<Currency> getCurrencyById(int id);

	void deleteCurrency(int id);

}
