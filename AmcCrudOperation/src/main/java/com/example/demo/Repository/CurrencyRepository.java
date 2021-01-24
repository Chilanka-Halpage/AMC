package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Currency;

public interface CurrencyRepository extends JpaRepository<Currency,Integer> {
	

}
