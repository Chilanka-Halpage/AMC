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

import com.itfac.amc.entity.Category;
import com.itfac.amc.service.CategoryService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("category/")
public class CategoryController {

	@Autowired
	CategoryService categoryservice;

	@GetMapping("findAllCategory")
	public List<Category> getallctegory() {
		return categoryservice.getAllCategory();

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

	@RequestMapping(method = RequestMethod.DELETE, value = "deleteCategory/{id}")
	public void deleteCategory(@PathVariable("id") int categoryId) {
		categoryservice.deleteCategory(categoryId);
	}

	@PostMapping("AddCategory")
	public Category AddCategory(@Validated @RequestBody Category category) {
		return categoryservice.AddCategory(category);

	}

	@PutMapping("UpdateCategory/{id}") // UpdateCategory
	public Category updateCategory(@PathVariable("id") int categoryId, @Validated @RequestBody Category category) {

		category.setCategoryId(categoryId);
		return categoryservice.updateCategory(category);
	}

	@GetMapping("findActiveCategoy")
	public List<Category> getActiveCategory() {
		return categoryservice.getActiveCategory();

	}

}
