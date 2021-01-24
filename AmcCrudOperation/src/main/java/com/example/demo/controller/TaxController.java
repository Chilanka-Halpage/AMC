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

import com.example.demo.entity.Tax;
import com.example.demo.service.TaxService;

@RestController
@RequestMapping("Tax/")
public class TaxController {
	
	@Autowired
	TaxService texservice;
	
	@GetMapping("findAllTax")
	List<Tax> getAllTax(){
		return texservice.getAllTax();
		
	}
	
	@GetMapping("findTax/{id}")
	ResponseEntity<Optional<Tax>> getTaxById(@PathVariable("id") int taxId){
		Optional<Tax> taxById = texservice.getTaxById(taxId);
		if(taxById!=null) {
			return ResponseEntity.ok(taxById);	
			}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No category with entered id " + taxId).body(taxById);
	}
	
	@RequestMapping(method = RequestMethod.DELETE,value="deleteTax/{id}")
	public void deleteTax(@PathVariable("id")int taxId) {
		texservice.deleteTax(taxId);
		
	}

}
