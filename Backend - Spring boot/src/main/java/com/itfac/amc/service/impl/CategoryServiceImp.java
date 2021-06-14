package com.itfac.amc.service.impl;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

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
	public Category AddCategory(Category category,HttpServletRequest httpServletRequest) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		category.setSavedIp(ipAddress);
		return categoryrepo.save(category);
	}

	@Override
	public void updateCategory(Category category,int categoryId) {
		Category categoryy=categoryrepo.findByCategoryId(categoryId);
		categoryy.setCategoryName(category.getCategoryName());
		categoryy.setActive(category.isActive());
		categoryrepo.save(categoryy);
	}
	
	@Override
	public boolean doesCategoryExists(String categoryName) {
	 return categoryrepo.existsByCategoryName(categoryName);
	}

	@Override
	public List<Category> getActiveCategory() {
		return categoryrepo.getActiveCategory();
	}

}
