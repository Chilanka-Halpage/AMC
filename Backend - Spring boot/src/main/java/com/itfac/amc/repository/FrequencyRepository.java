package com.itfac.amc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itfac.amc.entity.Frequency;

public interface FrequencyRepository extends JpaRepository<Frequency, Integer> {

	@Query(value = "SELECT * FROM frequency where active = true", nativeQuery = true)
	Frequency getActiveFrequency();

}
