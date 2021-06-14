package com.itfac.amc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.itfac.amc.dto.UserNameDto;
import com.itfac.amc.entity.User;
import com.itfac.amc.reportData.UserDetails;

public interface UserRepository extends JpaRepository<User, String> {

	@Query(value = "select max(cast(user_id as unsigned))+1 from user;", nativeQuery = true)
	int getUserLastNo();

	@Query(value = "select email from user where email= :email", nativeQuery = true)
	String getEmail(@Param("email") String email);

	@Query(value = "SELECT * FROM user where reset_password_token = :token", nativeQuery = true)
	User findByResetPasswordToken(@Param("token") String token);

	User findByEmail(String email);
	User findByUname(String uname);

	User findByUserId(String userId);

	@Query(value = "select user_id,uname,role,active,email,conatact_no from user", nativeQuery = true)
	List<UserDetails> getUserDetails();
	
	@Transactional
	@Modifying
	@Query(value="update user set reset_password_token = :token where email = :email",nativeQuery=true)
	void updateResetToken(@Param("token") String token,@Param("email") String email);
	
	@Transactional
	@Modifying
	@Query(value="update user set password = :encodedPassword,reset_password_token=null where user_id = :userId",nativeQuery=true)
	void updatePassword(@Param("encodedPassword") String encodedPassword,@Param("userId") String userId);
	
	UserNameDto findUsernameByUserId(String userid);

}
