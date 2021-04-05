package com.itfac.amc.service;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.dto.AmcMasterDto;
import com.itfac.amc.dto.AmcMasterSubData;
import com.itfac.amc.entity.AmcMaster;

public interface AmcMasterService {

	HashMap<String, String> addNewAmcByClientId(HttpServletRequest httpServletRequest, AmcMaster amc, int clientId)
			throws ResourceNotFoundException;

	AmcMasterSubData getAmcSubData(String amcNo);

	List<AmcMasterDto> getAmcByClient(int clientId);

	void updateAmcMaster(AmcMaster amcMaster, String amcNo);

}
