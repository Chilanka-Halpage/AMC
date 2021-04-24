package com.itfac.amc.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.data.repository.query.Param;

import com.itfac.amc.entity.ClientDepartment;

public interface ClientDepartmentService {

	/**
	 * Return list of client departments according to given client id. If records
	 * are not available for the client id, throw ResourceNotFound Exception
	 * 
	 * @param id
	 * @return List of ClientDepartment entities
	 */
	List<ClientDepartment> getDepartmentsByClientId(int id);

	/**
	 * Save new clientDepartment entity If a client entity exists for given Id, If
	 * not throw ResourceNotFoundException
	 * 
	 * @param ClientId
	 * @param department
	 * @param httpServletRequest
	 */
	void addDepartmentByClientId(int ClientId, ClientDepartment department, HttpServletRequest httpServletRequest);

	/**
	 * Save new client and clientDepartment and return a Map
	 * 
	 * @param department
	 * @param httpServletRequest
	 * @return
	 */
	Map<String, String> addDepartmentAndClient(ClientDepartment department, HttpServletRequest httpServletRequest);

	/**
	 * Modify clientDepartment data and throw ResourceNotFoundException if
	 * clientDepartment is not available to modify
	 * 
	 * @param httpServletRequest
	 * @param department
	 * @param clientId
	 * @param deptId
	 */
	void updateDepartment(HttpServletRequest httpServletRequest, @Valid ClientDepartment department, int clientId,
			int deptId);

	/**
	 * Check existence of the given client and return boolean value
	 * 
	 * @param clientId
	 * @param deptName
	 * @return
	 */
	boolean doesDeptExists(int clientId, String deptName);
	
	String countActiveAmcByClient(String userId);

	List<ClientDepartment> getDepartmentsByUserId(String id);

}
