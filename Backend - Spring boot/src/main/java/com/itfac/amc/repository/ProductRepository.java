package com.itfac.amc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itfac.amc.entity.Product;

public interface ProductRepository extends JpaRepository<Product,Integer>{
	

}
