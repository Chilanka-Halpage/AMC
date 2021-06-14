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

import com.itfac.amc.entity.Category;
import com.itfac.amc.service.CategoryService;
import com.itfac.amc.validation.OnCreate;
import com.itfac.amc.validation.OnUpdate;

@RestController
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
	public ResponseEntity<String> deleteCategory(@PathVariable("id") int categoryId) throws Exception {
		try {
			categoryservice.deleteCategory(categoryId);
		    return ResponseEntity.ok().body("delete done");
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body("can not delete since, already id use as a foriegn key.");
		}
	}

	@PostMapping("AddCategory")
	public ResponseEntity<String> AddCategory(@Validated(OnCreate.class) @RequestBody Category category,HttpServletRequest httpServletRequest) {
		try {
		categoryservice.AddCategory(category,httpServletRequest);
		return ResponseEntity.status(HttpStatus.OK).body("added successfull");
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}

	@PutMapping("UpdateCategory/{id}")
	public ResponseEntity<String> updateCategory(@PathVariable("id") int categoryId,@Validated(OnUpdate.class) @RequestBody Category category) {
		try {
		category.setCategoryId(categoryId);
		categoryservice.updateCategory(category,categoryId);
		return ResponseEntity.status(HttpStatus.OK).body("update successfull");
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@GetMapping("exists/{name}")
	public ResponseEntity<Boolean> existsCategory(@PathVariable("name") String categoryName) {
		boolean result = categoryservice.doesCategoryExists(categoryName);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("findActiveCategoy")
	public List<Category> getActiveCategory() {
		return categoryservice.getActiveCategory();

	}

}
