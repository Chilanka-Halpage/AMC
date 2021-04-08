package com.itfac.amc.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.dto.recieptDto;
import com.itfac.amc.entity.Receipt;
import com.itfac.amc.repository.ReceiptRepository;
import com.itfac.amc.service.ReceiptService;

@Service
public class ReceiptServiceImpl implements ReceiptService {

	@Autowired
	private ReceiptRepository receiptRepository;

	@Override
	public List<recieptDto> getAllReceipt() {
		List<recieptDto> receipt = receiptRepository.getReceipts();
		return receipt;
	}

	public void addReceipt(HttpServletRequest httpServletRequest, Receipt receipt) {
		receiptRepository.save(receipt);
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

}
