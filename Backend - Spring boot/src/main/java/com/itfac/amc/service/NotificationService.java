package com.itfac.amc.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.itfac.amc.entity.Notification;
import com.itfac.amc.reportData.NotificationView;

public interface NotificationService {

	public List<Notification> getNotification(String userId);
	public List<String> getNotificationNo(String user_id);
	public void updateIsRead(String userId);
	public Notification test(String userId, String notifications);
	//-----------------------------------------------------
	public List<Notification> getNotificationsPageable(Pageable pageable,String user_id);
}
