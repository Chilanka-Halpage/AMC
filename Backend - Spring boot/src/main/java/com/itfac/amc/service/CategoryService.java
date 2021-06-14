package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.itfac.amc.entity.Category;

public interface CategoryService {

	List<Category> getAllCategory();

	void deleteCategory(int id);

	Optional<Category> getCategoryById(int id);

	List<Category> getActiveCategory();

	void updateCategory(Category category, int categoryId);

	Category AddCategory(Category category, HttpServletRequest httpServletRequest);

	boolean doesCategoryExists(String categoryName);

}
