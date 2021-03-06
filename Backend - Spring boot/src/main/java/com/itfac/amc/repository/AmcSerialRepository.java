package com.itfac.amc.repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.entity.AmcSerial;
import com.itfac.amc.reportData.AllAmcs;
import com.itfac.amc.reportData.GetAllAmcs;

@Repository
public interface AmcSerialRepository extends JpaRepository<AmcSerial, String> {
	@Modifying(clearAutomatically = true, flushAutomatically = true)
	@Query(value = "INSERT INTO amc_number_serial (amc_no, last_serial) VALUES (:amcNo, :lastSerial)", nativeQuery = true)
	void setAmcSerialNo(@Param("amcNo") String amcNo, @Param("lastSerial") int lastSerial);

	@Query(value = "SELECT last_serial FROM amc_number_serial where amc_no = :amcNo ORDER BY ans_id DESC LIMIT 1", nativeQuery = true)
	String getAmcLastSerialNo(@Param("amcNo") String amcNo);

	// get All AMCs details report
	@Query(value = "select * from Get_All_AMC where start_date BETWEEN :Date1 AND :Date2", nativeQuery = true)
	List<GetAllAmcs> getAllAmcsBetweenDates(@Param("Date1") Date Date1, @Param("Date2") Date Date2);

	// get category wise All AMCs details report
	@Query(value = "select * from get_all_amc where start_date BETWEEN :Date1 AND :Date2", nativeQuery = true)
	List<AllAmcs> getAllAmc(@Param("Date1") LocalDate Date1, @Param("Date2") LocalDate Date2);


	// get renewal AMCs details report
	@Query(value = "select * from get_all_amc where amc_no=?1", nativeQuery = true)
	List<AllAmcs> getAllAmcByNo(String amc_no);
}
