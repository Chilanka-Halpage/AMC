package com.itfac.amc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.logindetailsDTo;
import com.itfac.amc.entity.LoginDetails;
import com.itfac.amc.reportData.viewLoginDetails;

@Repository
public interface LoginDtailsRepository extends JpaRepository<LoginDetails, Integer> {


	//void updateLastLoginDateForUserByName(String userName);
	@Query(value = "Select u.user_id, u.uname, ld.loged_ip, ld.loged_datetime from user u, login_details ld where u.user_id = ld.user_id" , nativeQuery = true)
	List<viewLoginDetails> loginDetails();

	@Query(value = "Select u.user_id, u.uname, ld.loged_ip, ld.loged_datetime from user u, login_details ld where u.user_id = ld.user_id ORDER BY logno DESC LIMIT 15", nativeQuery = true)
	List<logindetailsDTo> logindetailslist();
	
	@Query(value = "Select * from  login_details where user_id=:user_id ORDER BY logno DESC LIMIT 15", nativeQuery = true)
	List<LoginDetails> logindetailslistbyId(@Param("user_id") String userId);
	
}
