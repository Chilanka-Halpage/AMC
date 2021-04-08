package com.itfac.amc.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.itfac.amc.dto.AmcFullDataDto;
import com.itfac.amc.dto.AmcSerialDto;

public interface AmcSerialService {
	void addAmcSerialByAmcNo(String amcSerialData, MultipartFile file, String amcNo)
			throws JsonMappingException, JsonProcessingException;

	List<AmcSerialDto> getAmcByDepartment(int deptNo);

	AmcFullDataDto getAmcFullDataByAmcNo(String amcNo);

	AmcFullDataDto getAmcFullDataByAmcSerialNo(String amcSerialNo);

	void renewAmc(HttpServletRequest request, String data, MultipartFile file, String amcNo)
			throws JsonMappingException, JsonProcessingException;


}
