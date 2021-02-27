package com.itfac.amc.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.itfac.amc.dto.ClientDto;
import com.itfac.amc.entity.Client;

public interface ClientService {

	Client addClient(HttpServletRequest httpServletRequest, Client client) throws Exception;

	List<ClientDto> getClientByName(String clientName);

	Client updateClient(HttpServletRequest httpServletRequest, Client client);

	Page<Client> getAllClients(Pageable pageable);

	Client getClientByid(int clientId);

	boolean isAClient(String clientName);

}
