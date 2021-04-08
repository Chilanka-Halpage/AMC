package com.itfac.amc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.reportData.viewLoginDetails;
import com.itfac.amc.repository.LoginDtailsRepository;
import com.itfac.amc.service.LoginDetailsService;

@Service
public class LoginDetailsServiceImpl implements LoginDetailsService{
	
	@Autowired
	private LoginDtailsRepository loginDtailsRepository;
	
	//login details---------------------------------
	//get from userdetailscontroller-----------------------
	@Override
	public List<viewLoginDetails> loginDetails(){
		return loginDtailsRepository.loginDetails();
	}
	
}
