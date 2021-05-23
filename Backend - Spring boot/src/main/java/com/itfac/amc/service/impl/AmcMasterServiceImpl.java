package com.itfac.amc.service.impl;

import java.math.BigDecimal;
import java.time.Year;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.ResourceCreationFailedException;
import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.dto.AmcMasterDto;
import com.itfac.amc.dto.AmcMasterSubData;
import com.itfac.amc.entity.AmcHistory;
import com.itfac.amc.entity.AmcMaster;
import com.itfac.amc.entity.AmcSerial;
import com.itfac.amc.entity.Client;
import com.itfac.amc.repository.AmcHistoryRepository;
import com.itfac.amc.repository.AmcMasterRepository;
import com.itfac.amc.repository.AmcSerialRepository;
import com.itfac.amc.repository.ClientDepartmentRepository;
import com.itfac.amc.repository.ClientRepository;
import com.itfac.amc.service.AmcMasterService;
import com.itfac.amc.util.AuditorAwareImpl;

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
	@Autowired
	AmcHistoryRepository amcHistoryRepository;

	@Override
	@Transactional
	public String addNewAmcByClientId(HttpServletRequest httpServletRequest, AmcMaster amc, int clientId)
			throws ResourceNotFoundException {

		Client client = clientRepository.findById(clientId)
				.orElseThrow(() -> new ResourceNotFoundException("Client Id: " + clientId + " not found"));
		String ipAddress = httpServletRequest.getRemoteAddr();
		try {
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

			return returnedAmc.getAmcNo();
		} catch (Exception ex) {
			throw new ResourceCreationFailedException("Cannot save data in the system", ex.getCause());
		}

	}

	@Override
	public AmcMasterSubData getAmcSubData(String amcNo) {
		AmcMasterSubData amcMasterDto = amcMasterRepository.findByAmcNo(amcNo)
				.orElseThrow(() -> new ResourceNotFoundException("Amc No: " + amcNo + " not found"));
		return amcMasterDto;
	}

	@Override
	public List<AmcMasterDto> getAmcByClient(int clientId) {
		return amcMasterRepository.findByClientClientId(clientId);
	}

	@Override
	public List<AmcMasterDto> getAmcListByUserId(String userId) {
		int clientId = clientRepository.getClientIdByUserId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Client not found for user ID: " + userId));
		return getAmcByClient(clientId);
	}

	@Override
	public void updateAmcMaster(AmcMaster amcMaster, String amcNo, String amsSerialNo) {
		AmcMaster amc = amcMasterRepository.findById(amcNo)
				.orElseThrow(() -> new ResourceNotFoundException("Amc No: " + amcNo + " not found"));
		AmcSerial amcSerial = amcSerialRepository.findById(amsSerialNo)
				.orElseThrow(() -> new ResourceNotFoundException("Amc Serial No: " + amsSerialNo + " not found"));

		// -----------------------------------------------------------------
		AmcHistory amcHistory = new AmcHistory();
		Date currentDate = new Date();
		String userId = new AuditorAwareImpl().getCurrentAuditor().orElse(null);
		if (!amc.getFrequency().equalsIgnoreCase(amcMaster.getFrequency())) {
			amcHistory.setAmcNo(amcNo);
			amcHistory.setDateTime(currentDate);
			amcHistory.setFieldName("Frequency");
			amcHistory.setNewValue(amcMaster.getFrequency());
			amcHistory.setOldValue(amc.getFrequency());
			amcHistory.setUserId(userId);
			amcHistoryRepository.save(amcHistory);
		}
		if (amc.getExchangeRate().compareTo(amcMaster.getExchangeRate()) != 0) {
			amcHistory.setAmcNo(amcNo);
			amcHistory.setDateTime(currentDate);
			amcHistory.setFieldName("Exchange Rate");
			amcHistory.setNewValue(amcMaster.getExchangeRate().toString());
			amcHistory.setOldValue(amc.getExchangeRate().toString());
			amcHistory.setUserId(userId);
			amcHistoryRepository.save(amcHistory);
		}
		if (amc.getTotalValue().compareTo(amcMaster.getTotalValue())!= 0) {
			amcHistory.setAmcNo(amcNo);
			amcHistory.setDateTime(currentDate);
			amcHistory.setFieldName("Total Value");
			amcHistory.setNewValue(amcMaster.getTotalValue().toString());
			amcHistory.setOldValue(amc.getTotalValue().toString());
			amcHistory.setUserId(userId);
			amcHistoryRepository.save(amcHistory);
		}
		if (amc.getTotalValueLkr().compareTo(amcMaster.getTotalValueLkr()) != 0) {
			amcHistory.setAmcNo(amcNo);
			amcHistory.setDateTime(currentDate);
			amcHistory.setFieldName("Total Value Lkr");
			amcHistory.setNewValue(amcMaster.getTotalValueLkr().toString());
			amcHistory.setOldValue(amc.getTotalValueLkr().toString());
			amcHistory.setUserId(userId);
			amcHistoryRepository.save(amcHistory);
		}
		// -----------------------------------------------------------------

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
		try {
			amcMasterRepository.save(amc);
			amcSerialRepository.save(amcSerial);
		} catch (Exception ex) {
			throw new ResourceCreationFailedException("Error occrred while data are being updated", ex.getCause());
		}
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
