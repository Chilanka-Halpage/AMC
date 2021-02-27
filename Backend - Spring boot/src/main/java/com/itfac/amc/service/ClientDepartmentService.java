package com.itfac.amc.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.itfac.amc.entity.Client;
import com.itfac.amc.entity.ClientDepartment;

public interface ClientDepartmentService {

	List<ClientDepartment> getDepartmentsByClientId(int id);
	void addDepartmentByClientId(int ClientId, ClientDepartment department, HttpServletRequest httpServletRequest);
	Map<String, String> addDepartmentAndClient(ClientDepartment department, HttpServletRequest httpServletRequest);
	ClientDepartment updateDepartment(HttpServletRequest httpServletRequest, @Valid ClientDepartment dept);
	Map<String, Object> getClientAndDeptByDeptId(int id);

}
