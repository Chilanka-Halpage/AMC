package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import com.itfac.amc.entity.ProformaInvoice;

public interface ProformaInvoiceService {
	
	List<ProformaInvoice> getAllProformaInvoice();

	void deleteInvoice(String piNo);

	Optional<ProformaInvoice> getProformaInvoiceById(String piNo);
			
}
