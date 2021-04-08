package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import com.itfac.amc.entity.Product;

public interface ProductService {

	List<Product> findAllProduct();

	Optional<Product> ProductFindById(int id);

	void deleteProduct(int id);

	Product addProduct(Product product);

	Product updateProduct(Product product);

	Product getActiveProduct();

}
