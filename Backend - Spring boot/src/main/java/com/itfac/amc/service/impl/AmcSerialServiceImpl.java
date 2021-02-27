package com.itfac.amc.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.entity.AmcMaster;
import com.itfac.amc.entity.AmcSerial;
import com.itfac.amc.repository.AmcMasterRepository;
import com.itfac.amc.repository.AmcSerialRepository;
import com.itfac.amc.service.AmcSerialService;

@Service
public class AmcSerialServiceImpl implements AmcSerialService{
	
	@Autowired
	AmcSerialRepository amcSerialRepository;
	
	@Autowired
	AmcMasterRepository amcMasterRepository;

	@Override
	@Transactional
	public void addAmcSerialByAmcNo(AmcSerial amcSerial, String amcNo) {
		amcMasterRepository.findById(amcNo).map(amcMaster -> {
			amcSerial.setAmcMaster(amcMaster);
			amcSerial.getAmcProduct().setAmcMaster(amcMaster);
			return amcMaster;
		}).orElseThrow(() -> new ResourceNotFoundException("Amc not found for AmcNo: " + amcNo));
		String receivedLastSerialNo = amcSerialRepository.getAmcLastSerialNo(amcNo);
		int lastSerialNo = 0;
		if(receivedLastSerialNo != null) {
			lastSerialNo = (Integer.parseInt(receivedLastSerialNo)) + 1;
		}
		else {
			lastSerialNo += 1; 
		}
		String amcSerialNo = amcNo + lastSerialNo;
		amcSerial.setAmcSerialNo(amcSerialNo);
		/*BigDecimal totalValueLkrSerial = amcSerial.getMtcAmtPerAnnumLkr();
		BigDecimal totalValueLkrMaster = amcMaster.getTotalValueLkr();
		if(!(totalValueLkrMaster.equals(totalValueLkrSerial))) {
			amcMaster.setTotalValueLkr(totalValueLkrSerial);
			amcMaster.setTotalValue(amcSerial.getMtcAmtPerAnnum());
			amcMasterRepository.save(amcMaster);
		}*/
		amcSerialRepository.setAmcSerialNo(amcNo, lastSerialNo);
		amcSerialRepository.save(amcSerial);
	}

}
