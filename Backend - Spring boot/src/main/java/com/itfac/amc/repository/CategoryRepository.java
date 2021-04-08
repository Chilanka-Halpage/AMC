package com.itfac.amc.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.itfac.amc.entity.Category;
import com.itfac.amc.entity.User;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
	
	@Query(value = "SELECT * FROM category where active = true", nativeQuery = true)
	Category getActiveCategory ();
	
	@Query(value = "SELECT * FROM user where reset_password_token = :token", nativeQuery = true)
	User findByResetPasswordToken(@Param("token") String token);
    

}
