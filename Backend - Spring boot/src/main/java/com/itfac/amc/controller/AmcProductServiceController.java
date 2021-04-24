package com.itfac.amc.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.AmcProduct;
import com.itfac.amc.service.AmcProductService;

@RestController
@RequestMapping("amcProduct/")
public class AmcProductServiceController {
	
	@Autowired
	AmcProductService amcProductService;
	
	@PostMapping("add")
	AmcProduct saveAmcProduct(@Valid @RequestBody AmcProduct amcProduct) throws Exception{
		return amcProductService.saveAmcProduct(amcProduct);
	}

}
