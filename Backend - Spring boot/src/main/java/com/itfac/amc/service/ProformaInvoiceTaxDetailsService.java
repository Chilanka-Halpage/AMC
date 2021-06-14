package com.itfac.amc.service;

import javax.servlet.http.HttpServletRequest;

import com.itfac.amc.entity.ProformaInvoiceTaxDetails;

public interface ProformaInvoiceTaxDetailsService {

	ProformaInvoiceTaxDetails addProformaInvoiceTaxDetails(HttpServletRequest httpServletRequest,ProformaInvoiceTaxDetails proformaInvoiceTaxDetails);
		
}

