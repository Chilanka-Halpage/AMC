package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Tax;

public interface TaxService {

	List<Tax> getAllTax();

	Optional<Tax> getTaxById(int id);

	void deleteTax(int id);

}
