package com.itfac.amc.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.ResourceCreationFailedException;
import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.entity.Client;
import com.itfac.amc.entity.ClientDepartment;
import com.itfac.amc.repository.ClientDepartmentRepository;
import com.itfac.amc.repository.ClientRepository;
import com.itfac.amc.service.ClientDepartmentService;

@Service
public class ClientDepartmentServiceImpl implements ClientDepartmentService {

	@Autowired
	ClientDepartmentRepository clientDepartmentRepository;
	@Autowired
	ClientRepository clientRepository;

	@Override
	public List<ClientDepartment> getDepartmentsByClientId(int id) {
		List<ClientDepartment> deptList = clientDepartmentRepository.findByClientClientId(id);
		if (deptList.isEmpty()) {
			throw new ResourceNotFoundException("Not Data Found");
		}
		return deptList;
	}

	@Override
	public void addDepartmentByClientId(int clientId, ClientDepartment department,
			HttpServletRequest httpServletRequest) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		department.setLastModifiedIp(ipAddress);
		clientRepository.findById(clientId).map(client -> {
			department.setClient(client);
			return clientDepartmentRepository.save(department);
		}).orElseThrow(() -> new ResourceNotFoundException("ClientId " + clientId + " not found"));
	}

	@Override
	@Transactional
	public Map<String, String> addDepartmentAndClient(ClientDepartment department,
			HttpServletRequest httpServletRequest) {

		String ipAddress = httpServletRequest.getRemoteAddr();
		department.setLastModifiedIp(ipAddress);
		Client client = department.getClient();
		client.setLastModifiedIp(ipAddress);

		client = clientRepository.save(client);
		ClientDepartment clientDepartment = clientDepartmentRepository.save(department);

		if (client != null && clientDepartment != null) {
			HashMap<String, String> map = new HashMap<>();
			map.put("clientId", String.valueOf(client.getClientId()));
			map.put("clientName", client.getClientName());
			map.put("deptId", String.valueOf(clientDepartment.getDeptId()));
			map.put("deptName", clientDepartment.getDepartmentName());
			return map;
		}

		throw new ResourceCreationFailedException("Failed to insert data to the system");
	}

	@Override
	public void updateDepartment(HttpServletRequest httpServletRequest, @Valid ClientDepartment department,
			int clientId, int deptId) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		Client client = clientRepository.findById(clientId)
				.orElseThrow(() -> new ResourceNotFoundException("No record for client ID: " + clientId));
		if (clientDepartmentRepository.existsById(deptId)) {
			department.setClient(client);
			department.setLastModifiedIp(ipAddress);
			department.setDeptId(deptId);
			try {
				clientDepartmentRepository.save(department);
			} catch (RuntimeException ex) {
				throw ex;
			}
		} else {
			throw new ResourceNotFoundException("No matching records for department Id: " + deptId);
		}

	}

	@Override
	public Map<String, Object> getClientAndDeptByDeptId(int deptId) {
		ClientDepartment deptDetails = clientDepartmentRepository.findById(deptId).map(dept -> {
			dept.setClient(dept.getClient());
			return dept;
		}).orElseThrow(() -> new ResourceNotFoundException("Client Id: " + deptId + " not found"));

		Map<String, Object> deptData = new HashMap<>();
		// deptData.put("dept", deptDetails);
		deptData.put("client", clientRepository.findById(deptDetails.getClient().getClientId()));
		return deptData;
	}

	@Override
	public boolean doesDeptExists(int clientId, String deptName) {
		return clientDepartmentRepository.existsByClientClientIdAndDepartmentName(clientId, deptName);
	}

}
