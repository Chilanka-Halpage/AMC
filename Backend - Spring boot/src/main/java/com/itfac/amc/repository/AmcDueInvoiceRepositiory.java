package com.itfac.amc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.DueInvoiceDto;
import com.itfac.amc.dto.clinetpaymentDto;
import com.itfac.amc.entity.AmcDueInvoice;
import com.itfac.amc.entity.Notification;

@Repository
public interface AmcDueInvoiceRepositiory extends JpaRepository<AmcDueInvoice, Integer> {
	
	@Query(value = "SELECT * FROM amc_due_invoice where settle = false", nativeQuery = true)
	List<DueInvoiceDto> getDueInvoices();
    
	@Query(value = "SELECT * FROM amc_due_invoice where id = ?1", nativeQuery = true)
	Optional<DueInvoiceDto> getiddueinvoice(int id);
	
	@Query(value = "SELECT * FROM amc_due_invoice where settle = true", nativeQuery = true)
	List<DueInvoiceDto> settled();
	
	List save(List list);
	
	@Query(value = "SELECT ad.id,am.amc_no,ad.invoice_amount,ad.due_date,ad.invoice_payble_lkr,ad.currency_id from amc_due_invoice ad,amc_master am,client t  where ad.amc_no = am.amc_no and am.client_id = t.client_id and t.user_id = :user_id", nativeQuery = true)
	List<DueInvoiceDto> getduebyClientId( @Param("user_id") String user_id);
	
}
