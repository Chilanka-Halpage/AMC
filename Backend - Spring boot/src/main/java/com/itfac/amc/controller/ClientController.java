package com.itfac.amc.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.Client;
import com.itfac.amc.service.ClientService;
import com.itfac.amc.validation.OnCreate;

@RestController
@RequestMapping("client/")
public class ClientController {

	@Autowired
	ClientService clientService;

	// Return Client object for given ID
	@GetMapping("{id}")
	public ResponseEntity<Client> getClientById(@PathVariable("id") int clientId) {
		Client client = clientService.getClientById(clientId);
		return ResponseEntity.status(HttpStatus.OK).body(client);
	}

	// Return a page of Clients
	@GetMapping("allclients")
	public Page<Client> getAllClients(Pageable pageable) {
		return clientService.getAllClients(pageable);
	}

	// Return boolean value according to availability of the client entity for given
	// name
	@GetMapping("exists/{name}")
	public ResponseEntity<Boolean> existsClient(@PathVariable("name") String clientName) {
		boolean result = clientService.doesClientExists(clientName);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	// Modify Client Object
	@PutMapping("edit")
	public ResponseEntity<String> updateClient(HttpServletRequest httpServletRequest,
			@Validated(OnCreate.class) @RequestBody Client client) {
		this.clientService.updateClient(httpServletRequest, client);
		return ResponseEntity.status(HttpStatus.OK).body("Modified Succefully");
	}

	@GetMapping("activeclient")
	public String countclients() {
		return clientService.countclients();
	}

}
