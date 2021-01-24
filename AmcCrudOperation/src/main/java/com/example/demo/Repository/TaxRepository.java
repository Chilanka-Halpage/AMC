package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Tax;

public interface TaxRepository extends JpaRepository<Tax,Integer>{

}
