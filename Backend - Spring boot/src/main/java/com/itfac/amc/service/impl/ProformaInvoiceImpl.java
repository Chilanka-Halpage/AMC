package com.itfac.amc.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.itfac.amc.dto.DueInvoicecheckDto;
import com.itfac.amc.dto.ProformaInvoiceDto;
import com.itfac.amc.entity.AmcDueInvoice;
import com.itfac.amc.entity.ProformaInvoice;
import com.itfac.amc.repository.AmcDueInvoiceRepositiory;
import com.itfac.amc.repository.ProformaInvoiceRepository;
import com.itfac.amc.service.ProformaInvoiceService;

@Service
public class ProformaInvoiceImpl implements ProformaInvoiceService {

	@Autowired
	private ProformaInvoiceRepository proformaInvoiceRepository;
	
	@Autowired
	private AmcDueInvoiceRepositiory amcDueInvoiceRepositiory;

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

	//@Scheduled(fixedRate = 20000)
	@Scheduled(cron = "0 0 0 * * *",zone = "Indian/Maldives")
	public void checkdueInvoice() {	
		
		List<DueInvoicecheckDto> due = proformaInvoiceRepository. Proformainvoicecheck();
		
		for(int i=0; i<due.size();i++ ) {
			LocalDate piDate = due.get(i).getpi_date();
			int frequency = due.get(i).getfrequency();
			LocalDate Date2 = piDate.plusMonths(frequency);
			System.out.println(Date2);
			
			List<ProformaInvoiceDto> list = proformaInvoiceRepository.checkdueInvoice(Date2);
			
			BigDecimal invoice_amount = list.get(i).gettotal_amount_lkr();
			BigDecimal invoice_balance = list.get(i).gettotal_payble_lkr();
			String amcMasterno = list.get(i).getamc_no();
			int currencyId = list.get(i).getcurrency_id();
			
			AmcDueInvoice dueinvoice = new AmcDueInvoice();
			
			Date date = new Date();
			dueinvoice.setDueDate(date);
			dueinvoice.setInvoiceAmt(invoice_amount);
			dueinvoice.setInvoicePaybleLkr(invoice_balance);
			dueinvoice.getCurrency().setCurrencyId(currencyId);
			dueinvoice.getAmcMaster().setAmcNo(amcMasterno);
			
		  	amcDueInvoiceRepositiory.save(dueinvoice);
			
		}
	}
}