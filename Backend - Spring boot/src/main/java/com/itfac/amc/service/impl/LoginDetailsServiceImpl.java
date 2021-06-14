package com.itfac.amc.service.impl;

import java.nio.file.FileSystemException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.dto.logindetailsDTo;
import com.itfac.amc.entity.Client;
import com.itfac.amc.entity.Currency;
import com.itfac.amc.entity.LoginDetails;
import com.itfac.amc.entity.User;
import com.itfac.amc.reportData.viewLoginDetails;
import com.itfac.amc.repository.LoginDtailsRepository;
import com.itfac.amc.service.LoginDetailsService;

@Service
public class LoginDetailsServiceImpl implements LoginDetailsService {

	@Autowired
	private LoginDtailsRepository loginDtailsRepository;

	@Override
	public Page<viewLoginDetails> loginDetails(Pageable pageable) {
		return loginDtailsRepository.loginDetails(pageable);
	}


	@Override
	public LoginDetails loginDetails(HttpServletRequest httpServletRequest, String userId) {
		LoginDetails loginDetails = new LoginDetails();
		User user = new User();
		user.setUserId(userId);
		String ipAddress = httpServletRequest.getRemoteAddr();
		loginDetails.setLogedIp(ipAddress);
		loginDetails.setUser(user);
		Date date = new Date();
		loginDetails.setLogedTime(date);
		return loginDtailsRepository.save(loginDetails);
	}
	
	@Override
	public void logOutDetails(HttpServletRequest httpServletRequest, String userId) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		Date logoutDate = new Date();
		System.out.println(ipAddress);
		System.out.println(logoutDate);
		loginDtailsRepository.updateLogoutDetails(ipAddress,logoutDate,userId);
	}
	
	//logout details save when browser closed
	@Scheduled(cron = "0 0 * * * *",zone = "Indian/Maldives")
	public void logoutDetailsSave() {
		List<LoginDetails> getLoginDetails= loginDtailsRepository.logoutdetailslist();
		for (int i = 0; i < getLoginDetails.size(); i++) {
			Date logedDate=getLoginDetails.get(i).getLogedTime();
			String logoutIp=getLoginDetails.get(i).getLogedIp();
			int logno = getLoginDetails.get(i).getLogno();
			Date tokenExpireTime= DateUtils.addHours(logedDate, 2);
			Date date = new Date();//today date and time
			if(tokenExpireTime.before(date)) {
			loginDtailsRepository.logoutDetailUpdate(logoutIp, tokenExpireTime, logno);
			}
		}
	}

	@Override
	public List<logindetailsDTo> logindetailslist() {
		return loginDtailsRepository.logindetailslist();
	}

	@Override
	public List<LoginDetails> logindetailslistbyId(String userId) {
		return loginDtailsRepository.logindetailslistbyId(userId);
	}
}
