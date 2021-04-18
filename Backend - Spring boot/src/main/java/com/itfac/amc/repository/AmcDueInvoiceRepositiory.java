package com.itfac.amc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.DueInvoiceDto;
import com.itfac.amc.entity.AmcDueInvoice;

@Repository
public interface AmcDueInvoiceRepositiory extends JpaRepository<AmcDueInvoice, Integer> {
	
	@Query(value = "SELECT * FROM amc_due_invoice where settle = false", nativeQuery = true)
	List<DueInvoiceDto> getDueInvoices();
    
	@Query(value = "SELECT * FROM amc_due_invoice where id = ?1", nativeQuery = true)
	Optional<DueInvoiceDto> getiddueinvoice(int id);
	
	@Query(value = "SELECT * FROM amc_due_invoice where settle = true", nativeQuery = true)
	List<DueInvoiceDto> settled();
	
}
