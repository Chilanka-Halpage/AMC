package com.itfac.amc.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.entity.Category;
import com.itfac.amc.repository.CategoryRepository;
import com.itfac.amc.service.CategoryService;

@Service
public class CategoryServiceImp implements CategoryService {
	@Autowired
	CategoryRepository categoryrepo;

	@Override
	public List<Category> getAllCategory() {

		List<Category> findAllCategory = categoryrepo.findAll();
		return findAllCategory;
	}

	@Override
	public void deleteCategory(int id) {
		categoryrepo.deleteById(id);
	}

	@Override
	public Optional<Category> getCategoryById(int id) {
		Optional<Category> findByIdCate = categoryrepo.findById(id);
		return findByIdCate;
	}

	@Override
	public Category AddCategory(Category category) {
		return categoryrepo.save(category);
	}

	@Override
	public Category updateCategory(Category category) {
		return categoryrepo.save(category);
	}

	@Override
	public Category getActiveCategory() {
		return categoryrepo.getActiveCategory();
	}

}
