package com.itfac.amc.service;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.entity.AmcMaster;

public interface AmcService {

	HashMap<String, String> addNewAmcByClientId(HttpServletRequest httpServletRequest, AmcMaster amc, int clientId)throws ResourceNotFoundException ;

}
