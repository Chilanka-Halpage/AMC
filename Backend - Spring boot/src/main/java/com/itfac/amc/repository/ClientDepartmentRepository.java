package com.itfac.amc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.ClientDepartmentDto;
import com.itfac.amc.entity.ClientDepartment;

@Repository
public interface ClientDepartmentRepository extends JpaRepository<ClientDepartment, Integer> {

	List<ClientDepartment> findByClientClientId(int clientId);
	Optional<ClientDepartmentDto> findByDeptId(int deptId);
	boolean existsByClientClientIdAndDepartmentName(int clientId, String deptName);
	
}

