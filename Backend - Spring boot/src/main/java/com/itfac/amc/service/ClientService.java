package com.itfac.amc.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.itfac.amc.entity.Client;


public interface ClientService {

	/**
	 * Update data of an existing client. If an client for given Id is not available, throw resourceNotFoundException 
	 * 
	 * @param httpServletRequest
	 * @param client
	 */
	void updateClient(HttpServletRequest httpServletRequest, Client client);
	
	/**
	 * Return a page of clients
	 * 
	 * @param pageable
	 * @return  a page of client entities
	 */

	Page<Client> getAllClients(Pageable pageable);
	
	/**
	 * Return a client object, if client exists in the database in terms of given
	 * client id. If not, throw ResourceNotFound exception
	 * 
	 * @param clientId
	 * @return a client entity for given Id
	 */
	Client getClientById(int clientId);
	
	/**
	 * Return boolean value true only if client exists in terms of given name, otherwise false
	 * 
	 * @param clientName
	 * @return boolean value 
	 */
	boolean doesClientExists(String clientName);
	
	String countclients();
	
}
