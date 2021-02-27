package com.itfac.amc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.AmcSerial;
import com.itfac.amc.service.AmcSerialService;

@RestController()
@RequestMapping("amcSerial/")
@CrossOrigin("*")
public class AmcSerialController {
	
	@Autowired
	AmcSerialService amcSerialService;
	
	@RequestMapping("add/{amcNo}")
	public ResponseEntity<String> addNewAmcSerial(@RequestBody AmcSerial amcSerial, @PathVariable(value = "amcNo") String amcNo) {
		amcSerialService.addAmcSerialByAmcNo(amcSerial, amcNo);
		return ResponseEntity.status(HttpStatus.OK).body("Successfully Saved");
	}

}
