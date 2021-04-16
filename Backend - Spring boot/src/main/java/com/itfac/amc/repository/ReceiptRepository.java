package com.itfac.amc.repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
	String TotalrevanuelastYear(@Param("Date1") LocalDate Date1, @Param("Date2") LocalDate Date2);
    
	//find detail by clientId
	@Query(value = "SELECT rec_no,balance,pay_mode,category_name,pi_no,dept_id from receipt,client_department,category where receipt.client_dept_id = client_department.client_id and receipt.category_id = category.category_id and  client_id =?1", nativeQuery = true)
	List<recieptDto> getReceiptbyClientId(int client_id);
		
}
