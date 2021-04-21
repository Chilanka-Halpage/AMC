package com.itfac.amc.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
	
	@Query(value = "SELECT client_id FROM client WHERE user_id= :userId", nativeQuery = true)
	Optional<Integer> getClientIdByUserId(@Param("userId") String userId);

	//client details
	@Query(value = "select * from Client_Details where start_date BETWEEN :Date1 AND :Date2", nativeQuery = true)
	List<ClientDetails> getAllClientDetails(@Param("Date1") LocalDate date1, @Param("Date2") LocalDate date2);

	@Query(value = "select count(*) from client where active = true", nativeQuery = true)
	String countclients();
	
}
