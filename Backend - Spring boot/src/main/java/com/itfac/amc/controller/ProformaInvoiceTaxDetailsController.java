package com.itfac.amc.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.ProformaInvoiceTaxDetails;
import com.itfac.amc.service.ProformaInvoiceTaxDetailsService;

@RestController
@RequestMapping("/invoiceandTax")
public class ProformaInvoiceTaxDetailsController {
	
	@Autowired
	private ProformaInvoiceTaxDetailsService proformaInvoiceTaxDetailsService;
	
	@PostMapping("/add")
	ResponseEntity<ProformaInvoiceTaxDetails> addProformaInvoiceTaxDetails(HttpServletRequest httpServletRequest, @RequestBody ProformaInvoiceTaxDetails proformaInvoiceTaxDetails) throws Exception{
		ProformaInvoiceTaxDetails newInvoiceTax = proformaInvoiceTaxDetailsService.addProformaInvoiceTaxDetails(httpServletRequest, proformaInvoiceTaxDetails);
		return ResponseEntity.ok(newInvoiceTax );
	}

}
