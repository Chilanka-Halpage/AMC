package com.itfac.amc.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

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
import com.itfac.amc.validation.OnCreate;
import com.itfac.amc.validation.OnUpdate;

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
	public ResponseEntity<String> deleteProduct(@PathVariable("id") int productId) throws Exception {
		try {
		productservice.deleteProduct(productId);
		return ResponseEntity.ok().body("delete done");
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body("can not delete since, already id use as a foriegn key.");
		}
	}

	@PostMapping("AddProduct") 
	public ResponseEntity<String> addProduct(@Validated(OnCreate.class) @RequestBody Product product,HttpServletRequest httpServletRequest) {
		try {
		productservice.addProduct(product,httpServletRequest);
		return ResponseEntity.status(HttpStatus.OK).body("added successfull");
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}

	@PutMapping("updateProduct/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable("id") int productId,@Validated(OnUpdate.class) @RequestBody Product product) {
		try {
		productservice.updateProduct(product,productId);
		return ResponseEntity.status(HttpStatus.OK).body("update successfull");
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@GetMapping("exists/{name}")
	public ResponseEntity<Boolean> existsProdcut(@PathVariable("name") String productName) {
		boolean result = productservice.doesProductExists(productName);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("findActiveProduct")
	public List<Product> getActiveProduct() {
		return productservice.getActiveProduct();
	}

}
