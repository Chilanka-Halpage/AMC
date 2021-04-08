package com.itfac.amc.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.itfac.amc.dto.recieptDto;
import com.itfac.amc.entity.Receipt;

public interface ReceiptService {

	List<recieptDto> getAllReceipt();

	void addReceipt(HttpServletRequest httpServletRequest, Receipt receipt);

	Optional<recieptDto> getReceiptById(String recNo);

	List<Date> getDate(String user_id) throws Exception;

}
