package com.itfac.amc.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.dto.ClientDto;
import com.itfac.amc.entity.Client;
import com.itfac.amc.repository.ClientRepository;
import com.itfac.amc.service.ClientService;

@Service
public class ClientServiceImpl implements ClientService {

	@Autowired
	ClientRepository clientRepository;

//	@Override
//	public Client addClient(HttpServletRequest httpServletRequest, Client client) throws DuplicateMemberException {
//		String ipAddress = httpServletRequest.getRemoteAddr();
//		client.setLastModifiedIp(ipAddress);
//		if(!doesClientExists(client.getClientName()))
//			return clientRepository.save(client);
//		throw new DuplicateMemberException("Client already exists");
//	}

//	@Override
//	public List<ClientDto> getClientByName(String clientName) {
//		return clientRepository.findByClientName(clientName);
//	}

	@Override
	public Page<Client> getAllClients(Pageable pageable) {
		return clientRepository.findAll(pageable);
	}

	@Override
	public Client updateClient(HttpServletRequest httpServletRequest, Client client) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		client.setLastModifiedIp(ipAddress);
		return clientRepository.save(client);

	}

	
	@Override
	public Client getClientById(int clientId) {
		return clientRepository.findById(clientId).map(client -> {
			return client;
		}).orElseThrow(() -> new ResourceNotFoundException("Clent Id " + clientId + " not found"));
	}

	@Override
	public boolean doesClientExists(String clientName) {
		return clientRepository.existsByClientName(clientName);
	}

}
