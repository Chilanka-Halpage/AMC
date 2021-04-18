package com.itfac.amc.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.entity.Notification;
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
}
