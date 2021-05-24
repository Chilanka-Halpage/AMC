package com.itfac.amc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itfac.amc.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	@Query(value = "SELECT * FROM product where active = true", nativeQuery = true)
	List<Product> getActiveProduct();
	
	Product findByProductId(int productId);

	boolean existsByProductName(String productName);
}
