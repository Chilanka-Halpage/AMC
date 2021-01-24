package com.example.demo.service_Imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.CategoryRepository;
import com.example.demo.entity.Category;
import com.example.demo.service.CategoryService;

@Service
public class CategoryServiceImp implements CategoryService {
	@Autowired
	CategoryRepository categoryrepo;

	@Override
	public List<Category> getAllCategory(){
		
		List<Category> findAllCategory = categoryrepo.findAll();
		return findAllCategory;
	}
	
	@Override
	public void deleteCategory(int id) {
		categoryrepo.deleteById(id);
	}
	
//	public String Updatecategory() {
//		categoryrepo.save(Category)
//	}
	@Override
	public Optional<Category> getCategoryById(int id) {
		Optional<Category> findByIdCate = categoryrepo.findById(id);
		return findByIdCate;
	}
	

}
