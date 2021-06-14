package com.itfac.amc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.dto.AmcMasterDto;
import com.itfac.amc.dto.AmcMasterSubData;
import com.itfac.amc.entity.AmcMaster;
import com.itfac.amc.service.AmcMasterService;
import com.itfac.amc.validation.OnCreate;

@RestController()
@RequestMapping("amcMaster/")
public class AmcMasterController {

	@Autowired
	AmcMasterService amcService;

	@PostMapping("add/{clientId}")
	public ResponseEntity<String> addNewAmc(@Validated(OnCreate.class) @RequestBody AmcMaster amcMaster,
			@PathVariable("clientId") int clientId, HttpServletRequest httpServletRequest) {
		String result = amcService.addNewAmcByClientId(httpServletRequest, amcMaster, clientId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("get/amcs/{amcNo}")
	public ResponseEntity<AmcMasterSubData> getAmcSubData(@PathVariable("amcNo") String amcNo) {
		AmcMasterSubData result = amcService.getAmcSubData(amcNo);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("get/clients/{clientId}")
	public ResponseEntity<List<AmcMasterDto>> getAmcListByClient(@PathVariable("clientId") int clientId) {
		List<AmcMasterDto> result = amcService.getAmcByClient(clientId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("get/client/{userId}")
	public ResponseEntity<List<AmcMasterDto>> getAmcListByUserId(@PathVariable("userId") String userId) {
		List<AmcMasterDto> result = amcService.getAmcListByUserId(userId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@PutMapping("edit/{amcNo}/{serialNo}")
	public ResponseEntity<String> updateAmcByClient(@Validated(OnCreate.class) @RequestBody AmcMaster amcMaster,
			@PathVariable("amcNo") String amcNo, @PathVariable("serialNo") String amsSerialNo) {
		amcService.updateAmcMaster(amcMaster, amcNo, amsSerialNo);
		return ResponseEntity.status(HttpStatus.OK).body("Updated Successfully");
	}

	@GetMapping("allamcno/{idname}")
	ResponseEntity<List<String>> getAllAmcNo(@PathVariable("idname") String id) throws Exception {
		List<String> allAmc = amcService.getAllAmcNo(id);
		return ResponseEntity.status(HttpStatus.OK).body(allAmc);
	}
	
	@GetMapping("dashboard/activeAmcCount")
	public ResponseEntity<String> countActiveAmc() {
		String result = amcService.countActiveAmc();
        return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("dashboard/inactiveAmcCount")
	public ResponseEntity<String> countInactiveAmc() {
		String result = amcService.countInactiveAmc();
	    return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("dashboard/totalAmc")
	public ResponseEntity<String> countAmc() {
		String result =  amcService.countAmc();
		 return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("dashboard/AmcCountforclient/{userId}")
	public ResponseEntity<String> countAmcByClient(@PathVariable("userId") String userId) {
		String result = amcService.countAmcByClient(userId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("dashboard/AmcActiveCountforclient/{userId}")
	public ResponseEntity<String> countActiveAmcByClient(@PathVariable("userId") String userId) {
		String result = amcService.countActiveAmcByClient(userId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
}
