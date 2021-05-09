package com.itfac.amc.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.dto.clinetpaymentDto;
import com.itfac.amc.dto.recieptDto;
import com.itfac.amc.entity.Receipt;
import com.itfac.amc.repository.ReceiptRepository;
import com.itfac.amc.service.ReceiptService;

@Service
public class ReceiptServiceImpl implements ReceiptService {

	@Autowired
	private ReceiptRepository receiptRepository;
	@Autowired
	private NotificationServiceImpl notificationServiceImpl;

	@Override
	public List<recieptDto> getAllReceipt() {
		List<recieptDto> receipt = receiptRepository.getReceipts();
		return receipt;
	}

	public void addReceipt(HttpServletRequest httpServletRequest, Receipt receipt) {
		receiptRepository.save(receipt);
		BigDecimal total = receipt.getTotal();
		String amcNo = receipt.getAmcMaster().getAmcNo();
		int deptId = receipt.getClientDepartment().getDeptId();
		int currencyId = receipt.getCurrency().getCurrencyId();
		//String piNo = receipt.getInvoice().getPiNo();
		notificationServiceImpl.paymentNotification(deptId, currencyId, total, amcNo);
	}

	@Override
	public Optional<recieptDto> getReceiptById(String recNo) {
		return receiptRepository.getidReceipt(recNo);
	}

	@Override
	public List<Date> getDate(String amcNo) throws Exception {
		List<Date> recDates = receiptRepository.findDateByAmcNo(amcNo);
		if (recDates == null)
			throw new Exception("No payment has been done");
		return recDates;
	}

	@Override
	public List<BigDecimal> TotalrevanuelastYear(LocalDate Date1) {
		    LocalDate Date2 = Date1.minusMonths(1);
		    BigDecimal r1 = receiptRepository.TotalrevanuelastYear(Date2, Date1);
			LocalDate Date3 = Date2.minusMonths(1);
			BigDecimal r2 = receiptRepository.TotalrevanuelastYear(Date3, Date2);	
		    LocalDate Date4 = Date3.minusMonths(1);
		    BigDecimal r3 = receiptRepository.TotalrevanuelastYear(Date4, Date3);
		    LocalDate Date5 = Date4.minusMonths(1);
		    BigDecimal r4 = receiptRepository.TotalrevanuelastYear(Date5, Date4);	
		    LocalDate Date6 = Date5.minusMonths(1);
		    BigDecimal r5 = receiptRepository.TotalrevanuelastYear(Date6, Date5);
			LocalDate Date7 = Date6.minusMonths(1);
			BigDecimal r6 = receiptRepository.TotalrevanuelastYear(Date7, Date6);	
		    LocalDate Date8 = Date7.minusMonths(1);
		    BigDecimal r7 = receiptRepository.TotalrevanuelastYear(Date8, Date7);
		    LocalDate Date9 = Date8.minusMonths(1);
		    BigDecimal r8 = receiptRepository.TotalrevanuelastYear(Date9, Date8);
		    LocalDate Date10 = Date9.minusMonths(1);
		    BigDecimal r9 = receiptRepository.TotalrevanuelastYear(Date10, Date9);
			LocalDate Date11 = Date10.minusMonths(1);
			BigDecimal r10 = receiptRepository.TotalrevanuelastYear(Date11, Date10);	
		    LocalDate Date12 = Date11.minusMonths(1);
		    BigDecimal r11 = receiptRepository.TotalrevanuelastYear(Date12, Date11);
		    LocalDate Date13 = Date12.minusMonths(1);
		    BigDecimal r12 = receiptRepository.TotalrevanuelastYear(Date13, Date12);	
			List<BigDecimal> revenue=new ArrayList<>();
			revenue.add(r1);
			revenue.add(r2);
			revenue.add(r3);
			revenue.add(r4);
			revenue.add(r5);
			revenue.add(r6);
			revenue.add(r7);
			revenue.add(r8);
			revenue.add(r9);
			revenue.add(r10);
			revenue.add(r11);
			revenue.add(r12);
			return revenue;	
	}

	@Override
	public List<clinetpaymentDto> getReceiptbyClientId(String user_id) {
		return receiptRepository.getReceiptbyClientId(user_id);	
	}

	@Override
	public boolean doesReceiptExists(String recNo) {
		return receiptRepository.existsById(recNo);
	}

}
