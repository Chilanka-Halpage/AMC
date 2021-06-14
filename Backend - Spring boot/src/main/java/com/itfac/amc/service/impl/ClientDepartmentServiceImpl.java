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
import com.itfac.amc.entity.User;
import com.itfac.amc.repository.ClientDepartmentRepository;
import com.itfac.amc.repository.ClientRepository;
import com.itfac.amc.service.ClientDepartmentService;
import com.itfac.amc.service.UserService;

@Service
public class ClientDepartmentServiceImpl implements ClientDepartmentService {

	@Autowired
	ClientDepartmentRepository clientDepartmentRepository;
	@Autowired
	ClientRepository clientRepository;
	@Autowired
	UserService userService;

	@Override
	public List<ClientDepartment> getDepartmentsByClientId(int id) {
		List<ClientDepartment> deptList = clientDepartmentRepository.findByClientClientId(id);
		if (deptList.isEmpty()) {
			throw new ResourceNotFoundException("Not Data Found");
		}
		return deptList;
	}

	@Override
	public List<ClientDepartment> getDepartmentsByUserId(String id) {
		int clientId = clientRepository.getClientIdByUserId(id)
				.orElseThrow(() -> new ResourceCreationFailedException("Not Found client for user ID: " + id));
		return getDepartmentsByClientId(clientId);
	}

	@Override
	public void addDepartmentByClientId(int clientId, ClientDepartment department,
			HttpServletRequest httpServletRequest) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		Client client = clientRepository.findById(clientId)
				.orElseThrow(() -> new ResourceNotFoundException("ClientId " + clientId + " not found"));

		department.setLastModifiedIp(ipAddress);
		department.setClient(client);
		try {
			clientDepartmentRepository.save(department);
		} catch (Exception ex) {
			throw new ResourceCreationFailedException("Error occurred while department data are being saved to database",
					ex);
		}

	}

	@Override
	@Transactional
	public Map<String, String> addDepartmentAndClient(ClientDepartment department,
			HttpServletRequest httpServletRequest) {

		String ipAddress = httpServletRequest.getRemoteAddr();
		Client client = department.getClient();

		User user = new User();
		user.setActive(true);
		user.setContactNo(client.getContactNo());
		user.setEmail(department.getEmail());
		user.setRole("CLIENT");
		user.setUname(client.getClientName());
		user = userService.addUser(user, httpServletRequest);

		client.setUser(user);
		department.setLastModifiedIp(ipAddress);
		client.setLastModifiedIp(ipAddress);
		
		try {
			client = clientRepository.save(client);
			ClientDepartment clientDepartment = clientDepartmentRepository.save(department);
			HashMap<String, String> map = new HashMap<>();
			map.put("clientId", String.valueOf(client.getClientId()));
			map.put("clientName", client.getClientName());
			map.put("deptId", String.valueOf(clientDepartment.getDeptId()));
			map.put("deptName", clientDepartment.getDepartmentName());
			return map;
		} catch (Exception ex) {
			throw new ResourceCreationFailedException("Error occurred while the data are being saved to database",
					ex);
		}
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
			clientDepartmentRepository.save(department);
		} else {
			throw new ResourceNotFoundException("No matching records for department Id: " + deptId);
		}

	}

	@Override
	public boolean doesDeptExists(int clientId, String deptName) {
		return clientDepartmentRepository.existsByClientClientIdAndDepartmentName(clientId, deptName);
	}

	@Override
	public String countActiveAmcByClient(String userId) {
		return clientDepartmentRepository.countActiveAmcByClient(userId);
	}

}
