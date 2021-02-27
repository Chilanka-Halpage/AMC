package com.itfac.amc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.itfac.amc.entity.Tax;
import com.itfac.amc.service.TaxService;

@RestController
@RequestMapping("/tax")
public class TaxController {
	
	@Autowired
	private TaxService taxService;
	
	@GetMapping("/findalltaxes")
	public List<Tax> getAllTax(){
		return taxService.getAllTax();
	}
	
	@PostMapping("/add")
	ResponseEntity<Tax> addTax(HttpServletRequest httpServletRequest, @RequestBody Tax tax) throws Exception{
		System.out.println("hdbchdbhcdv");
		Tax newTax = taxService.addTax(httpServletRequest, tax);
		return ResponseEntity.ok(newTax);
	}
	
}
