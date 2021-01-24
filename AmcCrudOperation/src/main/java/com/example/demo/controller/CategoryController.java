package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Category;
import com.example.demo.service.CategoryService;

@RestController
@RequestMapping("category/")
public class CategoryController {
	
	@Autowired
	CategoryService categoryservice;
	
	@GetMapping("findAllCategory")
	public List<Category> getallctegory(){
		return categoryservice.getAllCategory();
	}
	
	@GetMapping("findCategory/{id}")
	ResponseEntity<Optional<Category>> getCategoryById(@PathVariable("id") int categoryId){
		Optional<Category> categoryByIdd = categoryservice.getCategoryById(categoryId);
		if(categoryByIdd!=null) {
			return ResponseEntity.ok(categoryByIdd);	
			}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No category with entered id " + categoryId).body(categoryByIdd);
	}
	
	@RequestMapping(method = RequestMethod.DELETE,value="deleteCategory/{id}")
	public void deleteCategory(@PathVariable("id") int categoryId) {
		categoryservice.deleteCategory(categoryId);
	}
	
	
	
}
