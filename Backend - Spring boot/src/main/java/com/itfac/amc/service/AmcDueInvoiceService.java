package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;

import com.itfac.amc.dto.DueInvoiceDto;
import com.itfac.amc.entity.AmcDueInvoice;

public interface AmcDueInvoiceService {

	List<DueInvoiceDto> getAllAmcDueInvoices();

	void addAmcDueInvoice( AmcDueInvoice amcDueInvoice);

	Optional<DueInvoiceDto> getAmcDueInvoiceById(int id);

	void deleteDueInvoice(int id);

	void updateAmcDueInvoice( AmcDueInvoice amcDueInvoice);
	
	List<DueInvoiceDto> settled();
	
	List<DueInvoiceDto> getduebyClientId(String id);

}
