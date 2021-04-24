package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import com.itfac.amc.entity.Product;

public interface ProductService {

	List<Product> findAllProduct();

	Optional<Product> ProductFindById(int id);

	void deleteProduct(int id);

	Product addProduct(Product product);

	List<Product> getActiveProduct();

	void updateProduct(Product product, int productId);

}
