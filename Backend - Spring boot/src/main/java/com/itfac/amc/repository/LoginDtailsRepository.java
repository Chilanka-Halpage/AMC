package com.itfac.amc.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
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
	
	@Query(value = "Select * from viewlogindetails" , nativeQuery = true)
	Page<viewLoginDetails> loginDetails(Pageable pageable);

	@Query(value = "Select u.user_id, u.uname, ld.loged_ip, ld.loged_datetime from user u, login_details ld where u.user_id = ld.user_id ORDER BY logno DESC LIMIT 15", nativeQuery = true)
	List<logindetailsDTo> logindetailslist();
	
	@Query(value = "Select * from  login_details where user_id=:user_id ORDER BY logno DESC LIMIT 15", nativeQuery = true)
	List<LoginDetails> logindetailslistbyId(@Param("user_id") String userId);
	
	//save logout details when token expired
	@Query(value = "select * from login_details where logout_datetime is null", nativeQuery = true)
	List<LoginDetails> logoutdetailslist();

	@Modifying
	@Transactional
	@Query(value = "update login_details set logout_ip= :logout_ip, logout_datetime = :logout_datetime Where user_id = :user_id ORDER BY loged_datetime DESC LIMIT 1", nativeQuery = true)
	void updateLogoutDetails(@Param("logout_ip") String logout_ip,
			@Param("logout_datetime") Date logout_datetime,
			@Param("user_id") String user_id);
	
	//update when close the browser
	@Modifying
	@Transactional
	@Query(value = "update login_details set logout_ip= :logout_ip, logout_datetime = :logout_datetime Where logno = :logno", nativeQuery = true)
	void logoutDetailUpdate(@Param("logout_ip") String logout_ip,
			@Param("logout_datetime") Date logout_datetime,
			@Param("logno") int logno);

}
