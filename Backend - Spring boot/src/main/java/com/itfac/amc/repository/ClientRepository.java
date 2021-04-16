package com.itfac.amc.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.ClientDto;
import com.itfac.amc.entity.Client;
import com.itfac.amc.reportData.ClientDetails;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

	List<ClientDto> findByClientName(String clientName);

	boolean existsByClientName(String name);

	@Query(value = "select * from Client_Details where mtc_start_date BETWEEN :Date1 AND :Date2", nativeQuery = true)
	List<ClientDetails> getAllClientDetails(@Param("Date1") LocalDate date1, @Param("Date2") LocalDate date2);

	@Query(value = "select count(*) from client where active = true", nativeQuery = true)
	String countclients();
	
}
