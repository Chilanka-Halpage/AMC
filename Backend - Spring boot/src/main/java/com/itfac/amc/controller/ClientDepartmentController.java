package com.itfac.amc.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
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

	@GetMapping("client/{deptId}")
	public ResponseEntity<Map<String, Object>> getClientAndDepartmentByDeptId(@PathVariable(value = "deptId") int id) {
		Map<String, Object> clientAndDept = clientDepartmentService.getClientAndDeptByDeptId(id);
		return ResponseEntity.status(HttpStatus.OK).body(clientAndDept);

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

	@PutMapping("edit")
	public ResponseEntity<String> updateDepartment(HttpServletRequest httpServletRequest,
			@Valid @RequestBody ClientDepartment dept) {
		ClientDepartment modifiedClient = this.clientDepartmentService.updateDepartment(httpServletRequest, dept);
		if (modifiedClient != null) {
			return ResponseEntity.status(HttpStatus.OK).body("Modified Succefully");
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Modification Failed");

	}
}
