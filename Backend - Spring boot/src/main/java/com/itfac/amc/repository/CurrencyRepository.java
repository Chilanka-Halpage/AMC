package com.itfac.amc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.itfac.amc.entity.Currency;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Integer> {

	@Query(value = "SELECT * FROM currency where active = true", nativeQuery = true)
	List<Currency> getActivecurrencies();
	
	boolean existsByCurrencyName(String name);
}
