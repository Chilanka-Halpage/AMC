package com.itfac.amc.service;

import java.util.List;

import com.itfac.amc.entity.Notification;
import com.itfac.amc.reportData.NotificationView;

public interface NotificationService {

	public List<NotificationView> getNotification(String userId);
	public List<String> getNotificationNo(String user_id);
	public void updateIsRead(String userId);
}
