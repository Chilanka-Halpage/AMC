package com.itfac.amc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.itfac.amc.entity.Tax;

@Repository
public interface TaxRepository extends JpaRepository<Tax, Integer> {

	@Query(value = "SELECT * FROM tax where active = true", nativeQuery = true)
	List<Tax> getActivetax();
	
}
