package com.itfac.amc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.itfac.amc.entity.Frequency;

public interface FrequencyRepository extends JpaRepository<Frequency, Integer> {

	@Query(value = "SELECT * FROM frequency where active = true", nativeQuery = true)
	List<Frequency> getActiveFrequency();
	
	Frequency findByFrequencyId(int frequencyId);

	boolean existsByFrequency(String frequency);

	@Query(value = "SELECT * FROM frequency where frequency = :string", nativeQuery = true)
	Frequency findByFrequency(@Param("string")String string);

	

	

}
