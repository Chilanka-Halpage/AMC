package com.example.demo.service_Imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.TaxRepository;
import com.example.demo.entity.Tax;
import com.example.demo.service.TaxService;

@Service
public class TaxServiceImp implements TaxService{
	
	@Autowired
	TaxRepository taxrepo;
	
	@Override
	public List<Tax> getAllTax() {
		List<Tax> findAllTax = taxrepo.findAll();
		return findAllTax;
	}
	
	@Override
	public Optional<Tax> getTaxById(int id) {
		Optional<Tax> findById = taxrepo.findById(id);
		return findById;
	}
	
	@Override
	public void deleteTax(int id) {
		taxrepo.deleteById(id);
	}

}
