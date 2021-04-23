package com.itfac.amc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<String> getAmcByClient(@RequestBody AmcMaster amcMaster, @PathVariable("amcNo") String amcNo,
			@PathVariable("serialNo") String amsSerialNo) {
		amcService.updateAmcMaster(amcMaster, amcNo, amsSerialNo);
		return ResponseEntity.status(HttpStatus.OK).body("Updated Successfully");
	}

	@GetMapping("allamcno/{idname}")
	ResponseEntity<List<String>> getAllAmcNo(@PathVariable("idname") String id) throws Exception {
		List<String> allAmc = amcService.getAllAmcNo(id);
		return ResponseEntity.status(HttpStatus.OK).body(allAmc);
	}

	@GetMapping("activeAmcCount")
	public String countActiveAmc() {
		return amcService.countActiveAmc();
	}

	@GetMapping("inactiveAmcCount")
	public String countInactiveAmc() {
		return amcService.countInactiveAmc();
	}

	@GetMapping("totalAmc")
	public String countAmc() {
		return amcService.countAmc();
	}

	@GetMapping("AmcCountforclient/{userId}")
	public String countAmcByClient(@PathVariable("userId") String userId) {
		return amcService.countAmcByClient(userId);
	}

	@GetMapping("AmcActiveCountforclient/{userId}")
	public String countActiveAmcByClient(@PathVariable("userId") String userId) {
		return amcService.countActiveAmcByClient(userId);
	}
}
