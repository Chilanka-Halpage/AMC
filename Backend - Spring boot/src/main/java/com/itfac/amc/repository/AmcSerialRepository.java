package com.itfac.amc.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.AmcFullDataDto;
import com.itfac.amc.dto.AmcSerialDto;
import com.itfac.amc.dto.addRecieptDto;
import com.itfac.amc.entity.AmcSerial;
import com.itfac.amc.reportData.AllAmcs;
import com.itfac.amc.reportData.ClientAmc;
import com.itfac.amc.reportData.ClientPaymentsDetails;
import com.itfac.amc.reportData.ExpiredAmc;
import com.itfac.amc.reportData.FullDetailsReport;
import com.itfac.amc.reportData.PaymentReport;
import com.itfac.amc.reportData.RenewalAmcs;
import com.itfac.amc.reportData.RenewedAmcs;

@Repository
public interface AmcSerialRepository extends JpaRepository<AmcSerial, String> {
	@Modifying(clearAutomatically = true, flushAutomatically = true)
	@Query(value = "INSERT INTO amc_number_serial (amc_no, last_serial) VALUES (:amcNo, :lastSerial)", nativeQuery = true)
	void setAmcSerialNo(@Param("amcNo") String amcNo, @Param("lastSerial") int lastSerial);

	@Query(value = "SELECT last_serial FROM amc_number_serial WHERE amc_no = :amcNo ORDER BY last_serial DESC LIMIT 1", nativeQuery = true)
	String getAmcLastSerialNo(@Param("amcNo") String amcNo);

	@Query(value = "SELECT * FROM amc_serial WHERE client_dept_id =  :deptNo", nativeQuery = true)
	List<AmcSerialDto> getAmcListBydeptNo(@Param("deptNo") int deptNo);

	@Query(value = "SELECT * FROM amcFullData WHERE amc_no= :amcNo ORDER BY amc_serial_no DESC LIMIT 1", nativeQuery = true)
	Optional<AmcFullDataDto> getAmcFullDataByAmcNo(@Param("amcNo") String amcNo);

	@Query(value = "SELECT * FROM amcFullData WHERE amc_serial_no= :amcSerialNo", nativeQuery = true)
	Optional<AmcFullDataDto> getAmcFullDataByAmcSerialNo(@Param("amcSerialNo") String amcSerialNo);

	// All AMCs details--------------------
	@Query(value = "select * from get_all_amc where start_date BETWEEN :Date1 AND :Date2 AND active = true", nativeQuery = true)
	List<AllAmcs> getAllAmc(@Param("Date1") LocalDate date1, @Param("Date2") LocalDate date2);
	
	// All AMCs details category wise--------------------
	@Query(value = "select * from get_all_amc where category_name =:category AND  start_date BETWEEN :Date1 AND :Date2", nativeQuery = true)
	List<AllAmcs> getAllAmcCtgWise(@Param("Date1") LocalDate date1, @Param("Date2") LocalDate date2, @Param("category") String category);

	// Jasper Report-----------------------
	@Query(value = "select * from get_all_amc where start_date BETWEEN :Date1 AND :Date2", nativeQuery = true)
	List<AllAmcs> getAllAmcJr(@Param("Date1") LocalDate date1, @Param("Date2") LocalDate date2);

	// Renewed AMCs ------------------------
	@Query(value = "select * from renewed_amc where mtc_start_date BETWEEN :Date1 AND :Date2", nativeQuery = true)
	List<RenewedAmcs> getRenewedAmcs(@Param("Date1") LocalDate Date1, @Param("Date2") LocalDate Date2);

	// Renewal AMCs-----------------------------
	@Query(value = "select * from renewal_amc where renewal BETWEEN :Date1 AND :Date2", nativeQuery = true)
	List<RenewalAmcs> getRenewalAmcs(@Param("Date1") LocalDate Date1, @Param("Date2") LocalDate Date2);

	// Expired AMCs----------------------------------
	@Query(value = "select * from expired_amc where mtc_end_date BETWEEN :Date1 AND :Date2", nativeQuery = true)
	List<ExpiredAmc> getExpiredAmcs(@Param("Date1") LocalDate Date1, @Param("Date2") LocalDate Date2);

	// Full details report-------------------------------------
	@Query(value = "select * from full_details_report where mtc_start_date BETWEEN :Date1 AND :Date2  AND active = true", nativeQuery = true)
	List<FullDetailsReport> getFullDetails(@Param("Date1") LocalDate Date1, @Param("Date2") LocalDate Date2);

	// Payment Details report----------------------------------------
	@Query(value = "select * from payment_report where rec_date BETWEEN :Date1 AND :Date2", nativeQuery = true)
	List<PaymentReport> paymentsReport(@Param("Date1") LocalDate Date1, @Param("Date2") LocalDate Date2);
	
	@Query(value = "select * from payment_report where category_name =:category AND  rec_date BETWEEN :Date1 AND :Date2", nativeQuery = true)
	List<PaymentReport> paymentsReportCtgWise(@Param("Date1") LocalDate date1, @Param("Date2") LocalDate date2, @Param("category") String category);

	// Client AMC report---------------------------------------
	@Query(value = "SELECT * FROM get_client_amc where user_id = :user_id", nativeQuery = true)
	List<ClientAmc> ClientAmcReport(@Param("user_id") String user_id);

	// Payment report for client--------------------------------------
	@Query(value = "SELECT * FROM client_payment_report WHERE user_id = :user_id", nativeQuery = true)
	List<ClientPaymentsDetails> ClientPaymentsReport(@Param("user_id") String user_id);

	// Quarter wise report
	@Query(value = "Call getTotal(:date1,:date2);", nativeQuery = true)
	BigDecimal getRevanue(@Param("date1") LocalDate date1, @Param("date2") LocalDate date2);
	
	@Query(value = "Call getTotalCtgWise(:date1,:date2,:category);", nativeQuery = true)
	BigDecimal getRevanueCtgWise(@Param("date1") LocalDate date1, @Param("date2") LocalDate date2,@Param("category") String category);

	// renevel amc counnt for client home
	@Query(value = "select count(*) from renewal_amc ra, client c where ra.client_name = c.client_name and c.user_id = :user_id and renewal BETWEEN :Date1 AND :Date2", nativeQuery = true)
	String getRenewalAmc(@Param("Date1") LocalDate Date1, @Param("Date2") LocalDate Date2, @Param("user_id") String user_id );
	
	//receipt detaisl
	@Query(value = "select ct.category_name, sa.category_id,sa.client_dept_id , cn.currency_name,  cn.currency_id from amc_serial sa, category ct, currency cn where sa.category_id = ct.category_id and sa.currency_id = cn.currency_id and amc_serial_no= :amcS_no", nativeQuery = true)
	addRecieptDto getdetalis(@Param("amcS_no") String amcS_no );

}



