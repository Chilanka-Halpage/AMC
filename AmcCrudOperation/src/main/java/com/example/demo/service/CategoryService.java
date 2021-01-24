package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Category;



public interface CategoryService {

	List<Category> getAllCategory();

	void deleteCategory(int id);

	Optional<Category> getCategoryById(int id);
	
	

}
