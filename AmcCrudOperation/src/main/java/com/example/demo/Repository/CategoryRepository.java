package com.example.demo.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
	
// @Query(value="SELECT * FROM Category", nativeQuery=true)
// List<Object> getAllCategory();
}
