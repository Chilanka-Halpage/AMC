package com.itfac.amc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.reportData.NotificationView;
import com.itfac.amc.service.NotificationService;

@RestController
@RequestMapping("/notification")
public class NotificationController {

	@Autowired
	private NotificationService notificationService;
	
	@GetMapping("/getNotification/{userId}")
	public List<NotificationView> getNotification(@PathVariable(value = "userId") String userId){
		return notificationService.getNotification(userId);
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
	public void test(@PathVariable(value = "userId") String userId) {
		notificationService.test(userId);
	}
}
