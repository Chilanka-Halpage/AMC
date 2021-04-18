package com.itfac.amc.service.impl;

import java.math.BigDecimal;
import java.time.Year;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.ResourceCreationFailedException;
import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.dto.AmcMasterDto;
import com.itfac.amc.dto.AmcMasterSubData;
import com.itfac.amc.entity.AmcMaster;
import com.itfac.amc.entity.AmcSerial;
import com.itfac.amc.entity.Client;
import com.itfac.amc.repository.AmcMasterRepository;
import com.itfac.amc.repository.AmcSerialRepository;
import com.itfac.amc.repository.ClientDepartmentRepository;
import com.itfac.amc.repository.ClientRepository;
import com.itfac.amc.service.AmcMasterService;

@Service
public class AmcMasterServiceImpl implements AmcMasterService {

	@Autowired
	AmcMasterRepository amcMasterRepository;
	@Autowired
	AmcSerialRepository amcSerialRepository;
	@Autowired
	ClientRepository clientRepository;
	@Autowired
	ClientDepartmentRepository clientDepartmentRepository;

	@Override
	@Transactional
	public String addNewAmcByClientId(HttpServletRequest httpServletRequest, AmcMaster amc, int clientId)
			throws ResourceNotFoundException {

		Client client = clientRepository.findById(clientId)
				.orElseThrow(() -> new ResourceNotFoundException("Client Id: " + clientId + " not found"));
		String ipAddress = httpServletRequest.getRemoteAddr();

		// calculate amcNo
		String currentYear = String.valueOf(Year.now().getValue());
		String receivedLastNo = amcMasterRepository.getAmcLastNo(currentYear);
		int lastNo = (receivedLastNo != null) ? (Integer.parseInt(receivedLastNo)) + 1 : 1;
		String amcNo = currentYear + lastNo;

		amc.setClient(client);
		amc.setAmcNo(amcNo);
		amc.setLastModifiedIp(ipAddress);

		// update amc_number table by inserting new last_no
		amcMasterRepository.setAmcNo(currentYear, lastNo);
		AmcMaster returnedAmc = amcMasterRepository.save(amc);

		if (returnedAmc != null)
			return returnedAmc.getAmcNo();

		throw new ResourceCreationFailedException("Cannot save data in the system");

	}

	@Override
	public AmcMasterSubData getAmcSubData(String amcNo) {
		AmcMasterSubData amcMasterDto = amcMasterRepository.findByAmcNo(amcNo)
				.orElseThrow(() -> new ResourceNotFoundException("Amc No: " + amcNo + " not found"));
		return amcMasterDto;
	}

	@Override
	public List<AmcMasterDto> getAmcByClient(int clientId) {
		List<AmcMasterDto> amcList = amcMasterRepository.findByClientClientId(clientId);
		if (amcList.isEmpty())
			throw new ResourceNotFoundException("Client ID " + clientId + " not have records");
		return amcList;
	}

	@Override
	public void updateAmcMaster(AmcMaster amcMaster, String amcNo, String amsSerialNo) {
		AmcMaster amc = amcMasterRepository.findById(amcNo)
				.orElseThrow(() -> new ResourceNotFoundException("Amc No: " + amcNo + " not found"));
		AmcSerial amcSerial = amcSerialRepository.findById(amsSerialNo)
				.orElseThrow(() -> new ResourceNotFoundException("Amc Serial No: " + amsSerialNo + " not found"));

		amc.setStartDate(amcMaster.getStartDate());
		amc.setActive(amcMaster.isActive());
		amc.setTotalValue(amcMaster.getTotalValue());
		amc.setTotalValueLkr(amcMaster.getTotalValueLkr());
		amc.setInvDesc(amcMaster.getInvDesc());
		amc.setRemark(amcMaster.getRemark());
		amc.setCurrency(amcMaster.getCurrency());
		BigDecimal exchangeRate = amcMaster.getExchangeRate();
		if (!exchangeRate.equals(amc.getExchangeRate())) {
			amc.setExchangeRate(exchangeRate);
			amcSerial.setMtcAmtforfrequencyLkr(amcSerial.getMtcAmtforfrequency().multiply(exchangeRate));
			amcSerial.setMtcAmtforfrequencyPerItemLkr(amcSerial.getMtcAmtforfrequencyPerItem().multiply(exchangeRate));
			amcSerial.setMtcAmtPerAnnumLkr(amcSerial.getMtcAmtPerAnnum().multiply(exchangeRate));
			amcSerial.setMtcAmtPerProductLkr(amcSerial.getMtcAmtPerProduct().multiply(exchangeRate));
		}
		String frequency = amcMaster.getFrequency();
		amc.setFrequency(frequency);
		amcSerial.setFrequency(frequency);
		amcMasterRepository.save(amc);
		amcSerialRepository.save(amcSerial);
	}

	@Override
	public List<String> getAllAmcNo(String amc_no) throws Exception {
		List<String> allAmc = amcMasterRepository.getAllAmcNo(amc_no);
		return allAmc;

	}

	@Override
	public String countActiveAmc() {
		return amcMasterRepository.countActiveAmc();
	}

	@Override
	public String countInactiveAmc() {
		return amcMasterRepository.countInactiveAmc();
	}

	@Override
	public String countAmc() {
		return amcMasterRepository.countAmc();
	}

	@Override
	public String countAmcByClient(String userId) {
		return amcMasterRepository.countAmcByClient(userId);
	}
	
	@Override
	public String countActiveAmcByClient(String userId) {
		return amcMasterRepository.countActiveAmcByClient(userId);
	}
     
}
