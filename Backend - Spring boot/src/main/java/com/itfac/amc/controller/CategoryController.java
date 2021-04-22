package com.itfac.amc.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.Category;
import com.itfac.amc.service.CategoryService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("category/")
public class CategoryController {

	@Autowired
	CategoryService categoryservice;

	@GetMapping("findAllCategory")
	public ResponseEntity<List<Category>> getallctegory() {
		List<Category> allCategory = categoryservice.getAllCategory();
		return ResponseEntity.status(HttpStatus.OK).body(allCategory);
	}

	@GetMapping("findAllCategory/{id}")
	ResponseEntity<Optional<Category>> getCategoryById(@PathVariable("id") int categoryId) {
		Optional<Category> categoryByIdd = categoryservice.getCategoryById(categoryId);

		if (categoryByIdd != null) {
			return ResponseEntity.ok(categoryByIdd);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No category with entered id " + categoryId)
				.body(categoryByIdd);
	}

	@DeleteMapping("deleteCategory/{id}")
	public ResponseEntity<String> deleteCategory(@PathVariable("id") int categoryId) {
		return ResponseEntity.badRequest().body("not deleted");
	}

	@PostMapping("AddCategory")
	public ResponseEntity<String> AddCategory(@Validated @RequestBody Category category) {
		categoryservice.AddCategory(category);
		return ResponseEntity.status(HttpStatus.OK).body("added successfull");

	}

	@PutMapping("UpdateCategory/{id}")
	public ResponseEntity<String> updateCategory(@PathVariable("id") int categoryId, @RequestBody Category category) {
		category.setCategoryId(categoryId);
		categoryservice.updateCategory(category);
		return ResponseEntity.status(HttpStatus.OK).body("update successfull");
	}

	@GetMapping("findActiveCategoy")
	public List<Category> getActiveCategory() {
		return categoryservice.getActiveCategory();

	}

}
