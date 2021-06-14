package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.itfac.amc.entity.Product;

public interface ProductService {

	List<Product> findAllProduct();

	Optional<Product> ProductFindById(int id);

	void deleteProduct(int id);

	List<Product> getActiveProduct();

	void updateProduct(Product product, int productId);

	Product addProduct(Product product, HttpServletRequest httpServletRequest);

	boolean doesProductExists(String productName);

}
