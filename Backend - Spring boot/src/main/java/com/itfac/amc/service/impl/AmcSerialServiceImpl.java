package com.itfac.amc.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.dto.AmcFullDataDto;
import com.itfac.amc.dto.AmcSerialDto;
import com.itfac.amc.entity.AmcMaster;
import com.itfac.amc.entity.AmcProduct;
import com.itfac.amc.entity.AmcSerial;
import com.itfac.amc.repository.AmcMasterRepository;
import com.itfac.amc.repository.AmcProductRepository;
import com.itfac.amc.repository.AmcSerialRepository;
import com.itfac.amc.service.AmcSerialService;
import com.itfac.amc.service.FileStorageService;

@Service
public class AmcSerialServiceImpl implements AmcSerialService {

	@Autowired
	AmcSerialRepository amcSerialRepository;
	@Autowired
	AmcMasterRepository amcMasterRepository;
	@Autowired
	AmcProductRepository amcProductRepository;
	@Autowired
	FileStorageService fileStorageService;

	@Override
	@Transactional
	public void addAmcSerialByAmcNo(String amcSerialData, MultipartFile file, String amcNo)
			throws JsonMappingException, JsonProcessingException {
		AmcMaster amcMaster = amcMasterRepository.findById(amcNo).orElse(null);

		if (amcMaster != null) {
			ObjectMapper objectMapper = new ObjectMapper();
			AmcSerial amcSerial = objectMapper.readValue(amcSerialData, AmcSerial.class);
			amcSerial.setAmcMaster(amcMaster);
			AmcProduct amcProduct = amcSerial.getAmcProduct();
			amcProduct.setAmcMaster(amcMaster);
			amcProductRepository.save(amcProduct);
			
			//calculate AMC serial no.
			String receivedLastSerialNo = amcSerialRepository.getAmcLastSerialNo(amcNo);
			int lastSerialNo = (receivedLastSerialNo != null) ? (Integer.parseInt(receivedLastSerialNo)) + 1 : 1;
			String amcSerialNo = amcNo + lastSerialNo;
			
			//update amc_number_serial table by inserting last_serial_no
			amcSerialRepository.setAmcSerialNo(amcNo, lastSerialNo);
			
			//save scanned copy of contract and get URL
			String contractUrl = fileStorageService.storeFile(file, amcSerialNo);
			amcSerial.setAmcSerialNo(amcSerialNo);
			amcSerial.setContractUrl(contractUrl);
			amcSerialRepository.save(amcSerial);
		} else {
			throw new ResourceNotFoundException("Amc not found for AmcNo: " + amcNo);
		}

	}

	@Override
	public List<AmcSerialDto> getAmcByDepartment(int deptNo) {
		List<AmcSerialDto> amcList = amcSerialRepository.getAmcListBydeptNo(deptNo);
		if (amcList.isEmpty())
			throw new ResourceNotFoundException("Department ID " + deptNo + " not have records");
		return amcList;
	}

	@Override
	public AmcFullDataDto getAmcFullDataByAmcNo(String amcNo) {
		AmcFullDataDto amcFullData = amcSerialRepository.getAmcFullDataByAmcNo(amcNo)
				.orElseThrow(() -> new ResourceNotFoundException("Not Found Records For Amc No: " + amcNo));
		return amcFullData;
	}

	@Override
	public AmcFullDataDto getAmcFullDataByAmcSerialNo(String amcSerialNo) {
		AmcFullDataDto amcFullData = amcSerialRepository.getAmcFullDataByAmcSerialNo(amcSerialNo).orElseThrow(
				() -> new ResourceNotFoundException("Not Found Records For Amc Serial No: " + amcSerialNo));
		return amcFullData;
	}

	@Override
	@Transactional
	public void renewAmc(HttpServletRequest request, String data, MultipartFile file, String amcNo) throws JsonMappingException, JsonProcessingException {
		String ipAddress = request.getRemoteAddr();
		AmcSerial amcSerial = new ObjectMapper().readValue(data, AmcSerial.class);
		int amcProdNo = amcSerial.getAmcProduct().getAmcProdNo();
		String frequency = amcSerial.getFrequency();
		BigDecimal exchangeRate = amcSerial.getAmcMaster().getExchangeRate();
		BigDecimal amcTotalValue = amcSerial.getAmcMaster().getTotalValue();
		BigDecimal amcTotalValueLkr = amcSerial.getAmcMaster().getTotalValueLkr();
		Date lifeEndDate = amcSerial.getAmcProduct().getLifeEndDate();

		AmcMaster amcMaster = amcMasterRepository.findById(amcNo)
				.orElseThrow(() -> new ResourceNotFoundException("Record for AMC No " + amcNo + " Not Found"));
		AmcProduct amcProduct = amcProductRepository.findById(amcProdNo)
				.orElseThrow(() -> new ResourceNotFoundException("Record for AMC Product Not Found"));

		amcMaster.setFrequency(frequency);
		amcMaster.setExchangeRate(exchangeRate);
		amcMaster.setTotalValue(amcTotalValue);
		amcMaster.setTotalValueLkr(amcTotalValueLkr);
		amcMaster.setLastModifiedIp(ipAddress);
		// Save updated AMC master inDB
		amcMasterRepository.save(amcMaster);

		amcProduct.setLifeEndDate(lifeEndDate);
		// save updated AMC product in DB
		amcProductRepository.save(amcProduct);

		String receivedLastSerialNo = amcSerialRepository.getAmcLastSerialNo(amcNo);
		int lastSerialNo = 0;
		lastSerialNo = (receivedLastSerialNo != null) ? (Integer.parseInt(receivedLastSerialNo)) + 1 : 1;
		String amcSerialNo = amcNo + lastSerialNo;
		amcSerialRepository.setAmcSerialNo(amcNo, lastSerialNo);
		String contractUrl = fileStorageService.storeFile(file, amcSerialNo);
		amcSerial.setAmcSerialNo(amcSerialNo);
		amcSerial.setAmcMaster(amcMaster);
		amcSerial.setContractUrl(contractUrl);
		amcSerialRepository.save(amcSerial);
	}

}
