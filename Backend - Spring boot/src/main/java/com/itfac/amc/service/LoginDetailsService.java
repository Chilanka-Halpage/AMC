package com.itfac.amc.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.repository.query.Param;

import com.itfac.amc.dto.logindetailsDTo;
import com.itfac.amc.entity.LoginDetails;
import com.itfac.amc.reportData.viewLoginDetails;

public interface LoginDetailsService {

	public List<viewLoginDetails> loginDetails();

	public LoginDetails loginDetails(HttpServletRequest httpServletRequest, String userId);

	List<logindetailsDTo> logindetailslist();
	
	List<LoginDetails> logindetailslistbyId(String userId);

}
