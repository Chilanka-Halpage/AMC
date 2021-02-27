package com.itfac.amc.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.entity.Client;
import com.itfac.amc.entity.ClientDepartment;
import com.itfac.amc.repository.ClientDepartmentRepository;
import com.itfac.amc.repository.ClientRepository;
import com.itfac.amc.service.ClientDepartmentService;

@Service
public class ClientDepartmentImpl implements ClientDepartmentService {

	@Autowired
	ClientDepartmentRepository clientDepartmentRepository;
	@Autowired
	ClientRepository clientRepository;

	@Override
	public List<ClientDepartment> getDepartmentsByClientId(int id) {
		return clientDepartmentRepository.findByClientClietnID(id);
	}

	@Override
	public void addDepartmentByClientId(int clientId, ClientDepartment department,
			HttpServletRequest httpServletRequest) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		department.setSavedIp(ipAddress);
		clientRepository.findById(clientId).map(client -> {
			department.setClient(client);
			return clientDepartmentRepository.save(department);
		}).orElseThrow(() -> new ResourceNotFoundException("ClientId " + clientId + " not found"));
	}

	@Override
	public Map<String, String> addDepartmentAndClient(ClientDepartment department,
			HttpServletRequest httpServletRequest) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		department.setSavedIp(ipAddress);
		Client client = department.getClient();
		client.setSavedIp(ipAddress);
		client = clientRepository.save(client);
		clientDepartmentRepository.save(department);
		HashMap<String, String> map = new HashMap<>();
		if (client != null) {
			map.put("clientNo", String.valueOf(client.getClietnID()));
			map.put("message", "Saved Successfully");
		} else
			map.put("message", "Saving failed");
		return map;
	}

	@Override
	public ClientDepartment updateDepartment(HttpServletRequest httpServletRequest,
			@Valid ClientDepartment department) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		department.setSavedIp(ipAddress);
		return clientDepartmentRepository.save(department);
	}

	@Override
	public Map<String, Object> getClientAndDeptByDeptId(int deptId) {
		ClientDepartment deptDetails = clientDepartmentRepository.findById(deptId).map(dept -> {
			dept.setClient(dept.getClient());
			return dept;
		}).orElseThrow(() -> new ResourceNotFoundException("Client Id: " + deptId + " not found"));

		Map<String, Object> deptData = new HashMap<>();
		// deptData.put("dept", deptDetails);
		deptData.put("client", clientRepository.findById(deptDetails.getClient().getClietnID()));
		return deptData;
	}

}
