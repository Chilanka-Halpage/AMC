package com.itfac.amc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.AmcMasterDto;
import com.itfac.amc.dto.AmcMasterSubData;
import com.itfac.amc.entity.AmcMaster;

@Repository
public interface AmcMasterRepository extends JpaRepository<AmcMaster, String> {

	Optional<AmcMasterSubData> findByAmcNo(String amcNo);

	List<AmcMasterDto> findByClientClientId(int clientId);

	@Query(value = "SELECT * FROM amc_master where client_id = :cId", nativeQuery = true)
	List<AmcMaster> getAmcByClients(@Param("cId") String cId);

	@Query(value = "SELECT last_no FROM amc_number where amc_year = :year ORDER BY last_no DESC LIMIT 1", nativeQuery = true)
	String getAmcLastNo(@Param("year") String currentYear);

	@Modifying(clearAutomatically = true, flushAutomatically = true)
	@Query(value = "INSERT INTO amc_number (amc_year, last_no) VALUES (:amcYear, :lastNo)", nativeQuery = true)
	void setAmcNo(@Param("amcYear") String amcYear, @Param("lastNo") int lastNo);

	@Modifying(clearAutomatically = true, flushAutomatically = true)
	@Query(value = "INSERT INTO amc_number_serial (amc_no, last_serial) VALUES (:amcNo,1)", nativeQuery = true)
	void setAmcSerialNo(@Param("amcNo") String amcNo);

}
