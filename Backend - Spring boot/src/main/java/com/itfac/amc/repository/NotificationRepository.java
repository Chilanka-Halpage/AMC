package com.itfac.amc.repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.RenewalAmcsNotificationDto;
import com.itfac.amc.entity.Notification;
import com.itfac.amc.entity.User;
import com.itfac.amc.reportData.NotificationView;

@Repository
public interface NotificationRepository  extends JpaRepository<Notification, Integer> {

	@Query(value = "SELECT * FROM notification WHERE user_id= :user_id ORDER BY saved_date DESC", nativeQuery = true)
	List<Notification> getNotification(@Param("user_id") String user_id);
	
	@Query(value = "SELECT * FROM notification WHERE user_id= :user_id ORDER BY saved_date DESC", nativeQuery = true)
	List<Notification> getNotificationsPageable(Pageable pageable, @Param("user_id") String user_id);
	
	@Query(value = "SELECT count(*) FROM notification WHERE user_id=:user_id And is_read=true", nativeQuery = true)
	 List<String> getNotificationNo(@Param("user_id") String user_id);
	
	@Modifying
	@Query(value = "update notification set is_read=FALSE where user_id =:user_id", nativeQuery = true)
	 void updateIsRead(@Param("user_id") String user_id);

	Notification save(Notification notification);
	
	@Query(value = "select user_id from user where role = 'amc_coordinator'or  role = 'admin' or  role = 'accountant';", nativeQuery = true)
	List<String> getUsersIds();	
	
	@Query(value = "select * from renewalnotifications where renewal = :renewalDate", nativeQuery = true)
	List<RenewalAmcsNotificationDto> renewalNotification(@Param("renewalDate") String renewalDate);
	

	@Query(value = "select u.user_id from user u, client c, client_department cd where cd.client_id=c.client_id AND c.user_id=u.user_id AND cd.dept_id= :dept_id", nativeQuery = true)
	String getUserIdToPaymentNotification(@Param("dept_id") int dept_id);
	
	@Query(value = "select currency_name from currency where currency_id= :currency_id", nativeQuery = true)
	String getCurruncyName(@Param("currency_id") int currency_id);
	
	@Query(value = "select c.client_name from client c, client_department cd where cd.client_id=c.client_id AND cd.dept_id= :dept_id", nativeQuery = true)
	String getClientName(@Param("dept_id") int dept_id);

	//List<Notification> findById(Pageable pageable, String user_id);

	
}