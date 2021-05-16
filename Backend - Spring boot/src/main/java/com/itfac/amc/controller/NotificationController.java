package com.itfac.amc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.Notification;
import com.itfac.amc.service.NotificationService;

@RestController
@RequestMapping("/notification")
public class NotificationController {

	@Autowired
	private NotificationService notificationService;
	
	@GetMapping("/getNotification/{userId}")
	public List<Notification> getNotification(Pageable pageable, @PathVariable(value = "userId") String userId){
		return notificationService.getNotifications(pageable,userId);
	}
	
	@GetMapping("/getNotificationNo/{userId}")
	public List<String> getNotificationNo(@PathVariable(value = "userId") String userId){
		return notificationService.getNotificationNo(userId);
	}
	
	@PutMapping("/notificationIsRead/{userId}")
	public void updateIsRead(@PathVariable(value = "userId") String userId){
		notificationService.updateIsRead(userId);
	}
	
	@PostMapping("/test/{userId}")
	public void test(@PathVariable(value = "userId") String userId,
			@PathVariable(value = "userId") String notifications) {
		notificationService.test(userId ,notifications);
	}
}
