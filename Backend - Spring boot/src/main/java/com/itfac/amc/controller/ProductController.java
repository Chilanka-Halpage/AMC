package com.itfac.amc.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.Product;
import com.itfac.amc.service.ProductService;

@RestController
@RequestMapping("Product/")
public class ProductController {

	@Autowired
	ProductService productservice;

	@GetMapping("findAllProduct")
	public ResponseEntity <List<Product>> getallProduct() {
		List<Product> allProduct= productservice.findAllProduct();
		return ResponseEntity.status(HttpStatus.OK).body(allProduct);
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

	@DeleteMapping("deleteProduct/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable("id") int productId) {
		
		return ResponseEntity.badRequest().body("not deleted");
	}

	@PostMapping("AddProduct") 
	public ResponseEntity<String> addProduct(@Validated @RequestBody Product product) {
		productservice.addProduct(product);
		return ResponseEntity.status(HttpStatus.OK).body("added successfull");

	}

	@PutMapping("updateProduct/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable("id") int productId,@Validated @RequestBody Product product) {
		product.setProductId(productId);
		productservice.updateProduct(product);
		return ResponseEntity.status(HttpStatus.OK).body("update successfull");
	}

	@GetMapping("findActiveProduct")
	public List<Product> getActiveProduct() {
		return productservice.getActiveProduct();
	}

}
