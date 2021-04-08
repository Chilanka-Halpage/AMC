package com.itfac.amc.repository;

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

}
