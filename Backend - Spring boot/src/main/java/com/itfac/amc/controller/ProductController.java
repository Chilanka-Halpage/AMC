package com.itfac.amc.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.Product;
import com.itfac.amc.service.ProductService;

@RestController
@RequestMapping("Product/")
@CrossOrigin("*")
public class ProductController {

	@Autowired
	ProductService productservice;

	@GetMapping("findAllProduct")
	public List<Product> getallProduct() {
		return productservice.findAllProduct();
	}

	@GetMapping("findAllProduct/{id}")
	ResponseEntity<Optional<Product>> getProductById(@PathVariable("id") int productId) {
		Optional<Product> productById = productservice.ProductFindById(productId);
		if (productById != null) {
			return ResponseEntity.ok(productById);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No category with entered id " + productId)
				.body(productById);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "deleteProduct/{id}")
	public void deleteProduct(@PathVariable("id") int productId) {
		productservice.deleteProduct(productId);
	}

	@PostMapping("AddProduct") // AddProduct
	public Product addProduct(@Validated @RequestBody Product product) {
		return productservice.addProduct(product);

	}

	@PutMapping("updateProduct/{id}")
	public Product updateProduct(@Validated @RequestBody Product product) {
		return productservice.updateProduct(product);
	}

	@GetMapping("findActiveProduct")
	public Product getActiveProduct() {
		return productservice.getActiveProduct();
	}

}
