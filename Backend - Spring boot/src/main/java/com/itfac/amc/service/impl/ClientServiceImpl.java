package com.itfac.amc.service.impl;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.itfac.amc.Exception.ResourceNotFoundException;
import com.itfac.amc.entity.Client;
import com.itfac.amc.repository.ClientRepository;
import com.itfac.amc.service.ClientService;

@Service
public class ClientServiceImpl implements ClientService {

	@Autowired
	ClientRepository clientRepository;

	@Override
	public Page<Client> getAllClients(Pageable pageable) {
		return clientRepository.findAll(pageable);
	}

	@Override
	public void updateClient(HttpServletRequest httpServletRequest, Client client) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		client.setLastModifiedIp(ipAddress);
		Client existingClient = clientRepository.findById(client.getClientId()).orElse(null);
		if (existingClient != null) {
			client.setUser(existingClient.getUser());
			clientRepository.save(client);
		} else
			throw new ResourceNotFoundException("No record for client ID: " + client.getClientId());

	}

	@Override
	public Client getClientById(int clientId) {
		return clientRepository.findById(clientId).orElseThrow(() -> new ResourceNotFoundException("Clent Id " + clientId + " not found"));
	}

	@Override
	public boolean doesClientExists(String clientName) {
		return clientRepository.existsByClientName(clientName);
	}

	@Override
	public String countclients() {
		return clientRepository.countclients();
	}

}
