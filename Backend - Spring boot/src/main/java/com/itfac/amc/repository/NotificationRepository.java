package com.itfac.amc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.entity.Client;
import com.itfac.amc.entity.Notification;
import com.itfac.amc.reportData.NotificationView;

@Repository
public interface NotificationRepository  extends JpaRepository<Notification, Integer> {

	@Query(value = "SELECT * FROM notificationview WHERE user_id= :user_id ORDER BY saved_date DESC", nativeQuery = true)
	List<NotificationView> getNotification(@Param("user_id") String user_id);
	
	@Query(value = "SELECT count(*) FROM notificationview WHERE user_id=:user_id And is_read=true", nativeQuery = true)
	 List<String> getNotificationNo(@Param("user_id") String user_id);
	
	@Modifying
	@Query(value = "update notification set is_read=FALSE where user_id =:user_id", nativeQuery = true)
	 void updateIsRead(@Param("user_id") String user_id);

	Notification save(Notification notification);
}