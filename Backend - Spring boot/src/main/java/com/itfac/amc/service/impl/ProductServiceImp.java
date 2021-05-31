package com.itfac.amc.service.impl;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.entity.Product;
import com.itfac.amc.repository.ProductRepository;
import com.itfac.amc.service.ProductService;

@Service
public class ProductServiceImp implements ProductService {

	@Autowired
	ProductRepository productrepo;

	@Override
	public List<Product> findAllProduct() {
		List<Product> findAllProduct = productrepo.findAll();
		return findAllProduct;
	}

	@Override
	public Optional<Product> ProductFindById(int id) {
		Optional<Product> findById = productrepo.findById(id);
		return findById;
	}

	@Override
	public void deleteProduct(int id) {
		productrepo.deleteById(id);
	}

	@Override
	public Product addProduct(Product product,HttpServletRequest httpServletRequest) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		product.setSavedIp(ipAddress);
		return productrepo.save(product);
	}

	@Override
	public void updateProduct(Product product,int productId) {
		Product productt=productrepo.findByProductId(productId);
		productt.setProductName(product.getProductName());
		productt.setActive(product.isActive());
	    productrepo.save(productt);
	}
	
	@Override
	public boolean doesProductExists(String productName) {
	boolean	product= productrepo.existsByProductName(productName);
	return product;
	}

	@Override
	public List<Product> getActiveProduct() {
		return productrepo.getActiveProduct();
	}

}
