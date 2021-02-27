package com.itfac.amc.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.ClientDto;
import com.itfac.amc.entity.Client;
import com.itfac.amc.reportData.AllClientDetails;
import com.itfac.amc.reportData.ClientDetails;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

	List<ClientDto> findByClientName(String clientName);

	boolean existsByClientName(String name);

	// client details report -only one client
	@Query(value = "select * from Client_Details where client_name=?1", nativeQuery = true)
	List<ClientDetails> getClientDetailsByName(String client_name);

	// All client details report between two dates
	@Query(value = "select * from All_Client_Details where start_date BETWEEN :Date1 AND :Date2", nativeQuery = true)
	List<AllClientDetails> getAllClientDetailsBetweenDates(@Param("Date1") Date Date1, @Param("Date2") Date Date2);

}
