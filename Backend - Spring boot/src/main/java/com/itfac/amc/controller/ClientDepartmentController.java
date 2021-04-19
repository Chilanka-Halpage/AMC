package com.itfac.amc.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.ClientDepartment;
import com.itfac.amc.service.ClientDepartmentService;

@RestController
@RequestMapping("clientDept/")
@CrossOrigin("*")
public class ClientDepartmentController {

	@Autowired
	ClientDepartmentService clientDepartmentService;

	@GetMapping("clients/{clientId}/departments")
	public List<ClientDepartment> getAllDepartmentsByClientId(@PathVariable(value = "clientId") int id) {
		return clientDepartmentService.getDepartmentsByClientId(id);
	}

	@GetMapping("client/{userId}/departments")
	public List<ClientDepartment> getAllDepartmentsByUserId(@PathVariable(value = "userId") String id) {
		return clientDepartmentService.getDepartmentsByUserId(id);
	}

	@GetMapping("exists/{clientId}/{deptName}")
	public ResponseEntity<Boolean> existsDept(@PathVariable("clientId") int clientId,
			@PathVariable("deptName") String deptName) {
		System.out.println(clientId + deptName);
		boolean result = clientDepartmentService.doesDeptExists(clientId, deptName);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@PostMapping("clients/{clientId}/department")
	public ResponseEntity<String> saveDepartmentByClientId(@PathVariable(value = "clientId") int clientId,
			@Valid @RequestBody ClientDepartment clientDepartment, HttpServletRequest httpServletRequest) {
		clientDepartmentService.addDepartmentByClientId(clientId, clientDepartment, httpServletRequest);
		return ResponseEntity.status(HttpStatus.OK).body("Successfully Saved");
	}

	@PostMapping("departments/client")
	public ResponseEntity<Map<String, String>> saveDepartmentAndClient(
			@Valid @RequestBody ClientDepartment clientDepartment, HttpServletRequest httpServletRequest) {
		Map<String, String> result = clientDepartmentService.addDepartmentAndClient(clientDepartment,
				httpServletRequest);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@PutMapping("edit/{clientId}/{deptId}")
	public ResponseEntity<String> updateDepartmentByClientId(HttpServletRequest httpServletRequest,
			@RequestBody ClientDepartment dept, @PathVariable("clientId") int clientId,
			@PathVariable("deptId") int deptId) {
		this.clientDepartmentService.updateDepartment(httpServletRequest, dept, clientId, deptId);
		return ResponseEntity.status(HttpStatus.OK).body("Modified Succesfully!");
	}
}
