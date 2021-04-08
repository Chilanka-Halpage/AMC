package com.itfac.amc.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.Tax;
import com.itfac.amc.service.TaxService;

@RestController
@RequestMapping("/tax")
@CrossOrigin("*")
public class TaxController {
	
	@Autowired
	private TaxService taxService;
	
	@GetMapping("/findalltaxes")
	public List<Tax> getAllTax(){
		return taxService.getAllTax();
	}
	
	@PostMapping("/add")
	ResponseEntity<Tax> addTax(HttpServletRequest httpServletRequest, @RequestBody Tax tax) throws Exception{
		Tax newTax = taxService.addTax(httpServletRequest, tax);
		return ResponseEntity.ok(newTax);
	}
	
	@RequestMapping(method = RequestMethod.DELETE,value="deleteTax/{id}")
	public void deleteTax(@PathVariable("id") int taxId) {
             taxService.deleteTax(taxId);
	}
		
	@GetMapping("findTax/{id}")
	ResponseEntity<Optional<Tax>> getTaxById(@PathVariable("id") int taxId){
		Optional<Tax> taxByIdd = taxService.getTaxById(taxId);
		if(taxByIdd!=null) {
			return ResponseEntity.ok(taxByIdd);	
			}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No tax with entered id " + taxId).body(taxByIdd);
	}
	
	@PutMapping("updateTax/{id}")
	public Tax updateTax(HttpServletRequest httpServletRequest,@RequestBody Tax tax) {
		return taxService.updateTax(httpServletRequest,tax);		
	}
	
}







