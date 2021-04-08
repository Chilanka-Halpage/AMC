package com.itfac.amc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.AmcHistory;
import com.itfac.amc.service.AmcHistoryService;

@RestController
@RequestMapping("amcHistory/")
public class AmcHistoryController {

	@Autowired
	AmcHistoryService amcHistoryService;

	@GetMapping("all/{amcNo}")
	public ResponseEntity<List<AmcHistory>> getHistoryDataByAmcNo(@PathVariable("amcNo") String amcNo) {
		List<AmcHistory> historyData = amcHistoryService.getHistoryByAmcNo(amcNo);
		return ResponseEntity.status(HttpStatus.OK).body(historyData);
	}
}
