package com.itfac.amc.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.AmcMaster;
import com.itfac.amc.service.AmcService;

@CrossOrigin("*")
@RestController()
@RequestMapping("amcMaster/")
public class AmcMasterController {

	@Autowired
	AmcService amcService;
	
	@RequestMapping("add/{clientId}")
	public ResponseEntity<Map<String, String>> addNewAmc(@RequestBody AmcMaster amcMaster, @PathVariable("clientId") int clientId, HttpServletRequest httpServletRequest) {
		Map<String, String> result = amcService.addNewAmcByClientId(httpServletRequest, amcMaster, clientId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
}
