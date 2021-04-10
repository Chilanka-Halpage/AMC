package com.itfac.amc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.dto.AmcMasterDto;
import com.itfac.amc.dto.AmcMasterSubData;
import com.itfac.amc.entity.AmcMaster;
import com.itfac.amc.service.AmcMasterService;

@CrossOrigin("*")
@RestController()
@RequestMapping("amcMaster/")
public class AmcMasterController {

	@Autowired
	AmcMasterService amcService;

	@RequestMapping("add/{clientId}")
	public ResponseEntity<String> addNewAmc(@RequestBody AmcMaster amcMaster, @PathVariable("clientId") int clientId,
			HttpServletRequest httpServletRequest) {
		String result = amcService.addNewAmcByClientId(httpServletRequest, amcMaster, clientId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("get/amcs/{amcNo}")
	public ResponseEntity<AmcMasterSubData> getAmcSubData(@PathVariable("amcNo") String amcNo) {
		AmcMasterSubData result = amcService.getAmcSubData(amcNo);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("get/clients/{clientId}")
	public ResponseEntity<List<AmcMasterDto>> getAmcByClient(@PathVariable("clientId") int clientId) {
		List<AmcMasterDto> result = amcService.getAmcByClient(clientId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@PutMapping("edit/{amcNo}")
	public ResponseEntity<String> getAmcByClient(@RequestBody AmcMaster amcMaster, @PathVariable String amcNo) {
		amcService.updateAmcMaster(amcMaster, amcNo);
		return ResponseEntity.status(HttpStatus.OK).body("Updated Successfully");
	}

	@GetMapping("allamcno/{idname}")
	ResponseEntity<List<String>> getAllAmcNo(@PathVariable("idname") String id) throws Exception {
		List<String> allAmc = amcService.getAllAmcNo(id);
		return ResponseEntity.status(HttpStatus.OK).body(allAmc);

	}
	
	@GetMapping("ActiveAmcCount")
	public String countActiveAmc() {
		return amcService.countActiveAmc();
	
	}

}
