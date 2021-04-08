package com.itfac.amc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itfac.amc.entity.Tax;

@Repository
public interface TaxRepository extends JpaRepository<Tax, Integer> {

	
}
