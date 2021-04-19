package com.itfac.amc.service.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.entity.Currency;
import com.itfac.amc.entity.LoginDetails;
import com.itfac.amc.entity.Notification;
import com.itfac.amc.entity.User;
import com.itfac.amc.reportData.NotificationView;
import com.itfac.amc.repository.NotificationRepository;
import com.itfac.amc.service.NotificationService;

@Service
public class NotificationServiceImpl implements NotificationService{
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	@Override
	public List<NotificationView> getNotification(String user_id){
		return notificationRepository.getNotification(user_id);
	}
	
	@Override
	public List<String> getNotificationNo(String user_id){
		return notificationRepository.getNotificationNo(user_id);
	}
	
	@Override
	@Transactional
	public void updateIsRead(String userId){
		System.out.println(userId);
		 notificationRepository.updateIsRead(userId);
	}
	
	@Override
	public Notification test(String userId){
		Notification notification = new Notification();
		Date date = new Date();
		User user = new User();
		user.setUserId(userId);
		notification.setNotification("notification1");
		notification.setIsRead(true);
		notification.setUser(user);
		notification.setSavedDate(date);
		return notificationRepository.save(notification);
	}
}
