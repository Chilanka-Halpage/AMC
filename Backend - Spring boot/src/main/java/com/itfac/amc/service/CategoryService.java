package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import com.itfac.amc.entity.Category;

public interface CategoryService {

	List<Category> getAllCategory();

	void deleteCategory(int id);

	Optional<Category> getCategoryById(int id);

	Category AddCategory(Category category);

	Category updateCategory(Category category);

}
