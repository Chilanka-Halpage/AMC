package com.itfac.amc.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;


import com.itfac.amc.dto.ProformaInvoiceDto;
import com.itfac.amc.entity.ProformaInvoice;

public interface ProformaInvoiceService {

	List<ProformaInvoiceDto> getAllProformaInvoice();

	void deleteInvoice(String piNo);

	Optional<ProformaInvoiceDto> getProformaInvoiceById(String piNo);

	void addProformaInvoice(HttpServletRequest httpServletRequest, ProformaInvoice proformaInvoice);

	Map<String, BigDecimal> totalPaybleAmount(String idname);
	
	 List<ProformaInvoiceDto> getActiveinvoicesById(String amcNo);

	void updateProformainvoiceInvoice(ProformaInvoice proformaInvoice);

	boolean doesInvoiceExists(String piNo);
	
	void checkdueInvoice();

}
