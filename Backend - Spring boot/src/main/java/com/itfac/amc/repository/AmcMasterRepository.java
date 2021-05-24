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
import com.itfac.amc.reportData.GetClientAmc;

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

	//getClientAmc mobile--------------------------------------------
	@Query(value = "select * from get_client_amcs where amc_no= :amcNo", nativeQuery = true)
	List<GetClientAmc> getClientAmcById(@Param("amcNo") String amc_no);

	// get all amc no ---------------------------------------------
	@Query(value = "select am.amc_no from amc_master am, client c, user u where am.client_id = c.client_id and c.user_id = u.user_id and u.user_id = :user_id", nativeQuery = true)
	List<String> getAllAmcNo(@Param("user_id") String user_id);
    
	//get Active amcs
	@Query(value = "select count(*) from amc_master where active = true", nativeQuery = true)
	String countActiveAmc();
	
	//get inactive amcs
	@Query(value = "select count(*) from amc_master where active = false", nativeQuery = true)
	String countInactiveAmc();
	
	//get total amcs
	@Query(value = "select count(*) from amc_master", nativeQuery = true)
	String countAmc();
	
	//get total amc by client
	@Query(value = "SELECT count(*) from amc_master a,client c where a.client_id = c.client_id and user_id = :user_id", nativeQuery = true)
	String countAmcByClient(@Param("user_id") String user_id);
	
	//get Active amc by client
	@Query(value = "SELECT count(*) from amc_master a,client c where a.client_id = c.client_id and a.active = true and user_id = :user_id", nativeQuery = true)
	String countActiveAmcByClient(@Param("user_id") String user_id);
	
}
