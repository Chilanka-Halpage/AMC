package com.itfac.amc.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.itfac.amc.dto.ClientDto;
import com.itfac.amc.entity.Client;

public interface ClientService {

//	Client addClient(HttpServletRequest httpServletRequest, Client client) throws Exception;

//	List<ClientDto> getClientByName(String clientName);

	Client updateClient(HttpServletRequest httpServletRequest, Client client);

	Page<Client> getAllClients(Pageable pageable);
	
	/**
	 * Return a client object, if client exists in the database in terms of given
	 * client id. If not, throw ResourceNotFound exception
	 */
	Client getClientById(int clientId);
	
	/**
	 * Return boolean value true only if client exists in terms of given name, otherwise false.
	*/
	boolean doesClientExists(String clientName);

}
