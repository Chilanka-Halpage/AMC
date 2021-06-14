package com.itfac.amc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.ClientDepartmentDto;
import com.itfac.amc.entity.ClientDepartment;

@Repository
public interface ClientDepartmentRepository extends JpaRepository<ClientDepartment, Integer> {

	List<ClientDepartment> findByClientClientId(int clientId);
	Optional<ClientDepartmentDto> findByDeptId(int deptId);
	boolean existsByClientClientIdAndDepartmentName(int clientId, String deptName);
	
	//department by client
	@Query(value = "SELECT count(*) from client_department a,client c where a.client_id = c.client_id and user_id = :user_id", nativeQuery = true)
	String countActiveAmcByClient(@Param("user_id") String user_id);
	
}

