package com.itfac.amc.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.clinetpaymentDto;
import com.itfac.amc.dto.recieptDto;
import com.itfac.amc.entity.Receipt;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, String> {

	@Query(value = "SELECT * FROM receipt;", nativeQuery = true)
	List<recieptDto> getReceipts();

	@Query(value = "SELECT * FROM amc.receipt where rec_no = ?1", nativeQuery = true)
	Optional<recieptDto> getidReceipt(String rec_no);

	// List<Date> findAllRecDateByAmcMasterAmcNo( String amcNo);
	@Query(value = "select rec_date from receipt where amc_no = :amcNo", nativeQuery = true)
	List<Date> findDateByAmcNo(@Param("amcNo") String amcNo);
	
	//Total revanue of last year
	@Query(value = "SELECT sum(total_lkr) FROM receipt WHERE rec_date BETWEEN :Date1 and :Date2", nativeQuery = true)
	BigDecimal TotalrevanuelastYear(@Param("Date1") LocalDate Date1, @Param("Date2") LocalDate Date2);
    
	//find detail by clientId
	@Query(value = "SELECT r.rec_no,r.balance,r.pay_mode,c.category_name,r.pi_no,t.client_id,r.rec_date from receipt r,amc_master am,category c,client t  where r.amc_no = am.amc_no and am.client_id = t.client_id and r.category_id = c.category_id and t.user_id = :client_id", nativeQuery = true)
	List<clinetpaymentDto> getReceiptbyClientId( @Param("client_id") String user_id);

	boolean existsById(String piNo);
		
}
