package com.itfac.amc.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.itfac.amc.entity.ClientDepartment;

public interface ClientDepartmentService {

	/**
	 * return list of client departments according to given client id. If records
	 * are not available for the client id, throw ResourceNotFound Exception
	 */
	List<ClientDepartment> getDepartmentsByClientId(int id);

	void addDepartmentByClientId(int ClientId, ClientDepartment department, HttpServletRequest httpServletRequest);

	Map<String, String> addDepartmentAndClient(ClientDepartment department, HttpServletRequest httpServletRequest);

	void updateDepartment(HttpServletRequest httpServletRequest, @Valid ClientDepartment department, int clientId,
			int deptId);

	Map<String, Object> getClientAndDeptByDeptId(int id);

	boolean doesDeptExists(int clientId, String deptName);

}
