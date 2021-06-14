package com.itfac.amc.service.impl;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.entity.ProformaInvoiceTaxDetails;
import com.itfac.amc.repository.ProformaInvoiceTaxDetailsRepository;
import com.itfac.amc.service.ProformaInvoiceTaxDetailsService;

@Service
public class ProformaInvoiceTaxDetailsImpl implements ProformaInvoiceTaxDetailsService {

	@Autowired
	private ProformaInvoiceTaxDetailsRepository proformaInvoiceTaxDetailsRepository;

	public ProformaInvoiceTaxDetails addProformaInvoiceTaxDetails(HttpServletRequest httpServletRequest,
			ProformaInvoiceTaxDetails proformaInvoiceTaxDetails) {
		return proformaInvoiceTaxDetailsRepository.save(proformaInvoiceTaxDetails);
	}

}
