package com.itfac.amc.service;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import com.itfac.amc.entity.Tax;

public interface TaxService {
 	
	List<Tax> getAllTax();

	void deleteTax(int id);

	Tax addTax(HttpServletRequest httpServletRequest, Tax tax);
	
}
