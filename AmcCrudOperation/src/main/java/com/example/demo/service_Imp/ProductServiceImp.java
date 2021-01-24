package com.example.demo.service_Imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.ProductRepository;
import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;

@Service
public class ProductServiceImp implements ProductService{
	
	@Autowired
	ProductRepository productrepo;
	
	@Override
	public List<Product> findAllProduct() {
		
		List<Product> findAllProduct= productrepo.findAll();
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

}
