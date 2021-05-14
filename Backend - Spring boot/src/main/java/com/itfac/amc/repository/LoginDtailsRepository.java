package com.itfac.amc.repository;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.logindetailsDTo;
import com.itfac.amc.entity.LoginDetails;
import com.itfac.amc.reportData.viewLoginDetails;

@Repository
public interface LoginDtailsRepository extends JpaRepository<LoginDetails, Integer> {

	//void updateLastLoginDateForUserByName(String userName);
//	@Query(value = "Select u.user_id, u.uname, ld.loged_ip, ld.loged_datetime, ld.logout_ip,ld.logout_datetime from user u, login_details ld where u.user_id = ld.user_id;" , nativeQuery = true)
//	List<viewLoginDetails> loginDetails(Pageable pageable);
	
	@Query(value = "Select * from viewlogindetails" , nativeQuery = true)
	List<viewLoginDetails> loginDetails(Pageable pageable);

	@Query(value = "SELECT * FROM login_details ORDER BY logno DESC LIMIT 7", nativeQuery = true)
	List<logindetailsDTo> logindetailslist();
	
	@Modifying
	@Transactional
	@Query(value = "update login_details set logout_ip= :logout_ip, logout_datetime = :logout_datetime Where user_id = :user_id ORDER BY loged_datetime DESC LIMIT 1", nativeQuery = true)
	void updateLogoutDetails(@Param("logout_ip") String logout_ip,
			@Param("logout_datetime") Date logout_datetime,
			@Param("user_id") String user_id);
}
