package com.itfac.amc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.dto.ClientDto;
import com.itfac.amc.entity.Client;
import com.itfac.amc.service.ClientService;

@RestController
@RequestMapping("client/")
@CrossOrigin("*")
public class ClientController {

	@Autowired
	ClientService clientService;

	@GetMapping("client/{name}")
	public ResponseEntity<List<ClientDto>> getClientByName(@PathVariable("name") String clientName) {
		List<ClientDto> clients = clientService.getClientByName(clientName);
		if (clients != null) {
			return ResponseEntity.ok(clients);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No client with name " + clientName)
				.body(clients);
	}

	@GetMapping("{id}")
	public ResponseEntity<Client> getClientById(@PathVariable("id") int clientId) {
		Client client = clientService.getClientByid(clientId);
		return ResponseEntity.status(HttpStatus.OK).body(client);
	}

	@GetMapping("allclients")
	public Page<Client> getAllClients(Pageable pageable) {
		return clientService.getAllClients(pageable);
	}

	@GetMapping("exists/{name}")
	public ResponseEntity<Boolean> existsClient(@PathVariable("name") String clientName) {
		boolean result = clientService.isAClient(clientName);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@PostMapping("add")
	public ResponseEntity<Client> addClient(HttpServletRequest httpServletRequest, @RequestBody Client client)
			throws Exception {
		Client newClient = clientService.addClient(httpServletRequest, client);
		return ResponseEntity.ok(newClient);
	}

	@PutMapping("edit")
	public ResponseEntity<String> updateClient(HttpServletRequest httpServletRequest,
			@Valid @RequestBody Client client) {
		Client modifiedClient = this.clientService.updateClient(httpServletRequest, client);
		if (modifiedClient != null) {
			return ResponseEntity.status(HttpStatus.OK).body("Modified Succefully");
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Modification Failed");
	}

}
