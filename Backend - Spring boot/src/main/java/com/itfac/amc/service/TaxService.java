package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.itfac.amc.entity.Tax;

public interface TaxService {
 	
	List<Tax> getAllTax();

	void deleteTax(int id);

	Tax addTax(HttpServletRequest httpServletRequest, Tax tax);

	Optional<Tax> getTaxById(int id);

	Tax updateTax(HttpServletRequest httpServletRequest, Tax tax);
}
