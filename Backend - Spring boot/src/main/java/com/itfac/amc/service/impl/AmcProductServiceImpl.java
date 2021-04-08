package com.itfac.amc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.entity.AmcProduct;
import com.itfac.amc.repository.AmcProductRepository;
import com.itfac.amc.service.AmcProductService;

@Service
public class AmcProductServiceImpl implements AmcProductService {

	@Autowired
	AmcProductRepository amcProductRepository;
	
	@Override
	public AmcProduct saveAmcProduct(AmcProduct amcProduct) throws Exception {
		return amcProductRepository.save(amcProduct);
	}

}
