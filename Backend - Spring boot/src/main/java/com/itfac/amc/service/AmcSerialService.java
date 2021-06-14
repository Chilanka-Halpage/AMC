package com.itfac.amc.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.itfac.amc.dto.AmcFullDataDto;
import com.itfac.amc.dto.AmcSerialDto;
import com.itfac.amc.dto.addRecieptDto;
import com.itfac.amc.dto.recieptDto;

public interface AmcSerialService {
	void addAmcSerialByAmcNo(String amcSerialData, MultipartFile file, String amcNo)
			throws JsonMappingException, JsonProcessingException;

	List<AmcSerialDto> getAmcByDepartment(int deptNo);

	AmcFullDataDto getAmcFullDataByAmcNo(String amcNo);

	AmcFullDataDto getAmcFullDataByAmcSerialNo(String amcSerialNo);

	void renewAmc(HttpServletRequest request, String data, MultipartFile file, String amcNo, String amcSerialNo)
			throws JsonMappingException, JsonProcessingException;
	
	addRecieptDto getdetalis(String amcS_no);

}
