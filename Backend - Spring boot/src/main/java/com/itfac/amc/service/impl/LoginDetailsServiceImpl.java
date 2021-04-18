package com.itfac.amc.service.impl;

import java.nio.file.FileSystemException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.entity.Currency;
import com.itfac.amc.entity.LoginDetails;
import com.itfac.amc.entity.User;
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
	
	@Override
	public LoginDetails loginDetails(HttpServletRequest httpServletRequest,String userId){
		LoginDetails loginDetails = new LoginDetails();
		User user = new User();
		user.setUserId(userId);
		String ipAddress = httpServletRequest.getRemoteAddr();
		loginDetails.setLogedIp(ipAddress);
		loginDetails.setUser(user);
		Date date = new Date();
		loginDetails.setLogedTime(date);
		loginDetails.setLogoutIp(ipAddress);
		loginDetails.setLogoutTime(date);
		return loginDtailsRepository.save(loginDetails);
	}
}
