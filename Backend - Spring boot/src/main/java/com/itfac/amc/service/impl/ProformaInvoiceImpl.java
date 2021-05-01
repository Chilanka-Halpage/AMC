package com.itfac.amc.service.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.itfac.amc.dto.ProformaInvoiceDto;
import com.itfac.amc.entity.ProformaInvoice;
import com.itfac.amc.repository.ProformaInvoiceRepository;
import com.itfac.amc.service.ProformaInvoiceService;

@Service
public class ProformaInvoiceImpl implements ProformaInvoiceService {

	@Autowired
	private ProformaInvoiceRepository proformaInvoiceRepository;

	@Override
	public List<ProformaInvoiceDto> getAllProformaInvoice() {
		List<ProformaInvoiceDto> proformaInvoice = proformaInvoiceRepository.getProformainvoices();
		return proformaInvoice;
	}

	public void addProformaInvoice(HttpServletRequest httpServletRequest, ProformaInvoice proformaInvoice) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		proformaInvoice.setSavedIp(ipAddress);
	    proformaInvoiceRepository.save(proformaInvoice);
	}

	@Override
	public void deleteInvoice(String piNo) {
		proformaInvoiceRepository.deleteById(piNo);
	}

	@Override
	public Optional<ProformaInvoiceDto> getProformaInvoiceById(String piNo) {
		return proformaInvoiceRepository.getProformaInvoiceById(piNo);
	}

	@Override
	public Map<String, BigDecimal> totalPaybleAmount(String idname) {
		BigDecimal paidAmount = proformaInvoiceRepository.getAmountById(idname);
		BigDecimal paybleAmount = proformaInvoiceRepository.getPiAmountById(idname);
		BigDecimal balance = paidAmount.subtract(paybleAmount);

		Map<String, BigDecimal> returnValue = new HashMap<>();
		returnValue.put("paidAmount", paidAmount);
		returnValue.put("paybleAmount", paybleAmount);
		returnValue.put("balance", balance);
		return returnValue;
	}

	@Override
	public List<ProformaInvoiceDto> getActiveinvoicesById(String amcNo) {
		List<ProformaInvoiceDto> proformaInvoice = proformaInvoiceRepository.getActiveinvoicesById(amcNo);
		return proformaInvoice;
	}

	@Override
	public void updateProformainvoiceInvoice(ProformaInvoice proformaInvoice) {
		proformaInvoiceRepository.save(proformaInvoice);
		
	}

	@Override
	public boolean doesInvoiceExists(String piNo) {
		return proformaInvoiceRepository.existsById(piNo);
	}
}