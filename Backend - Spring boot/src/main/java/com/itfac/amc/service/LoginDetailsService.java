package com.itfac.amc.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.itfac.amc.dto.logindetailsDTo;
import com.itfac.amc.entity.LoginDetails;
import com.itfac.amc.reportData.viewLoginDetails;

public interface LoginDetailsService {

	public Page<viewLoginDetails> loginDetails(Pageable pageable);

	public LoginDetails loginDetails(HttpServletRequest httpServletRequest, String userId);

	List<logindetailsDTo> logindetailslist();
	
	List<LoginDetails> logindetailslistbyId(String userId);

	public void  logOutDetails(HttpServletRequest httpServletRequest, String userId);

	//Page<LoginDetails> loginDetails(Pageable pageable);

}
