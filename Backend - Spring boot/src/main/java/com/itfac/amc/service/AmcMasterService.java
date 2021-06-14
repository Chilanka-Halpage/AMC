package com.itfac.amc.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.repository.query.Param;

import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.dto.AmcMasterDto;
import com.itfac.amc.dto.AmcMasterSubData;
import com.itfac.amc.entity.AmcMaster;

public interface AmcMasterService {

	/**
	 * Save new AMC Master entity for given client Id and return AMC No as string.
	 * Unless an entity is available for given client id throw an exception
	 * 
	 * @param httpServletRequest
	 * @param amc
	 * @param clientId
	 * @return AMC No
	 * @throws ResourceNotFoundException
	 */
	String addNewAmcByClientId(HttpServletRequest httpServletRequest, AmcMaster amc, int clientId)
			throws ResourceNotFoundException;

	/**
	 * Return portion of the AmcMaster entity for given amcNo. If not found an
	 * entity for given AMC no throw ResourceNotFoundException
	 * 
	 * @param amcNo
	 * @return
	 */
	AmcMasterSubData getAmcSubData(String amcNo);

	/**
	 * Return AmcMaterDto for given client Id. If not found throw
	 * ResourceNotFoundException
	 * 
	 * @param clientId
	 * @return
	 */
	List<AmcMasterDto> getAmcByClient(int clientId);

	/**
	 * Modify AMC master entity for given amcNo.If not found an entity for given AMC
	 * no throw ResourceNotFoundException
	 * 
	 * @param amcMaster
	 * @param amcNo
	 */
	void updateAmcMaster(AmcMaster amcMaster, String amcNo, String amsSerialNo);

	List<String> getAllAmcNo(String amc_no) throws Exception;
	
	String countActiveAmc();
	
	String countInactiveAmc();
	
	String countAmc();
	
	String countAmcByClient(String userId) throws ResourceNotFoundException;;
	
	String countActiveAmcByClient(String userId) throws ResourceNotFoundException;;

	List<AmcMasterDto> getAmcListByUserId(String userId) throws ResourceNotFoundException;;

}
