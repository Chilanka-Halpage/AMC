package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Product;

public interface ProductService {

	List<Product> findAllProduct();

	Optional<Product> ProductFindById(int id);

	void deleteProduct(int id);

}
