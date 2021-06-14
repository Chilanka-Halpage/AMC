package com.itfac.amc.service.impl;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.dto.RenewalAmcsNotificationDto;
import com.itfac.amc.entity.Notification;
import com.itfac.amc.entity.User;
import com.itfac.amc.reportData.NotificationView;
import com.itfac.amc.repository.NotificationRepository;
import com.itfac.amc.repository.UserRepository;
import com.itfac.amc.service.NotificationService;

@Service
public class NotificationServiceImpl implements NotificationService{
	
	@Autowired
	private NotificationRepository notificationRepository;
	@Autowired
	UserRepository userRepository;
	
	@Override
	public List<Notification> getNotification(String user_id){
		return notificationRepository.getNotification(user_id);
	}
	
	@Override
	public List<Notification> getNotificationsPageable(Pageable pageable,String user_id){
		return notificationRepository.getNotificationsPageable(pageable,user_id);
	}
	
	@Override
	public List<String> getNotificationNo(String user_id){
		return notificationRepository.getNotificationNo(user_id);
	}
	
	@Override
	@Transactional
	public void updateIsRead(String userId){
		 notificationRepository.updateIsRead(userId);
	}
	
	@Override
	public Notification test(String userId, String notifications){
		Notification notification = new Notification();
		User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Not found user ID: " + userId) );
		Date date = new Date();
		notification.setNotification("notification1");
		notification.setIsRead(true);
		notification.setUser(user);
		notification.setSavedDate(date);
		return notificationRepository.save(notification);
	}
	
	//renewal notification
	@Scheduled(cron = "0 0 0 * * *",zone = "Indian/Maldives")
	public void renewalNotificationSave() {
		List<RenewalAmcsNotificationDto> test1 = renewalNotification();
		System.out.println(test1);
		for (int i = 0; i < test1.size(); i++) { 
			Notification notification = new Notification();
			User user = userRepository.findById(test1.get(i).getuser_id()).orElseThrow(() -> new ResourceNotFoundException("Not fount user ID"));
			notification.setNotification("AMC No. " + test1.get(i).getamc_no() + " is to be renewed on " + test1.get(i).getrenewal());
			notification.setIsRead(true);
			notification.setUser(user);
			Date date = new Date();
			notification.setSavedDate(date);
			notificationRepository.save(notification);
			notificationToAdmin(test1.get(i).getamc_no(),test1.get(i).getrenewal(),test1.get(i).getclient_name());
		}
	}


	//renewal notification to admin, amc coordinator and accountant
	public void notificationToAdmin(String amcNo, Date renewal, String clientName) {
		List<String> userDetails = notificationRepository.getUsersIds();
		for (int i = 0; i < userDetails.size(); i++) { 
			Notification notification = new Notification();
			User user = userRepository.findById(userDetails.get(i)).orElseThrow(() -> new ResourceNotFoundException("Not fount user ID"));
			notification.setNotification("AMC No. "+ amcNo +" of " + clientName + " is to be renewed on " + renewal);
			notification.setIsRead(true);
			notification.setUser(user);
			Date date = new Date();
			notification.setSavedDate(date);
			notificationRepository.save(notification);
		}
	}
	
	public List<RenewalAmcsNotificationDto> renewalNotification() {
		System.out.println("testing");
		Date today = new Date(); //get today
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(today);
		calendar.add(Calendar.DAY_OF_YEAR, 7);//next week date
		Date date = calendar.getTime();
		System.out.println(date);
		String pattern = "yyyy/MM/dd";
	    SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
	    String nextDate = dateFormat.format(date);
		return notificationRepository.renewalNotification(nextDate);
	}
	
	//payment notification
	public void paymentNotification(int dept_id, int currency_id,BigDecimal total,String amcNo) {
		String userId = notificationRepository.getUserIdToPaymentNotification(dept_id);
		String currencyName = notificationRepository.getCurruncyName(currency_id);
		String clientNmae = notificationRepository.getClientName(dept_id);
		Notification notification = new Notification();
		Date date = new Date();
		User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Not found user ID: " + userId) );
		notification.setNotification("Amount of " + total +" " + currencyName + " has been successfully paid for AMC no. " + amcNo);
		notification.setIsRead(true);
		notification.setUser(user);
		notification.setSavedDate(date);
		notificationRepository.save(notification);
		paymentNotificationToAdmin(total,currencyName,amcNo,clientNmae);
	}
	
	//payment notification to admin, amc coordinator and accountant
	public void paymentNotificationToAdmin(BigDecimal total,String currencyName,String amcNo, String clientName) {
		List<String> userDetails = notificationRepository.getUsersIds();
		for (int i = 0; i < userDetails.size(); i++) { 
			Notification notification = new Notification();
			User user = userRepository.findById(userDetails.get(i)).orElseThrow(() -> new ResourceNotFoundException("Not fount user ID"));
			notification.setNotification("Amount of " + total +" " + currencyName + " has been successfully paid for AMC no. " + amcNo + " by " + clientName);
			notification.setIsRead(true);
			notification.setUser(user);
			Date date = new Date();
			notification.setSavedDate(date);
			notificationRepository.save(notification);
		}
	}
}
