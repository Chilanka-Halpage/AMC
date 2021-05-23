package com.itfac.amc.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.dto.DueInvoiceDto;
import com.itfac.amc.entity.AmcDueInvoice;
import com.itfac.amc.service.AmcDueInvoiceService;

@RestController
@RequestMapping("/amcDueInvoice")
public class AmcDueInvoiceController {

	@Autowired
	private AmcDueInvoiceService amcDueInvoiceService;

	@GetMapping("/AllDueInvoice")
	public List<DueInvoiceDto> getAllDueInvoices() {
		return amcDueInvoiceService.getAllAmcDueInvoices();
	}

	@PostMapping("/add")
	ResponseEntity<String> addAmcDueInvoice(@RequestBody AmcDueInvoice amcDueInvoice) throws Exception {
		amcDueInvoiceService.addAmcDueInvoice(amcDueInvoice);
		return ResponseEntity.ok("Successfully added");
	}

	@GetMapping("finddueinvoice/{id}")
	ResponseEntity<Optional<DueInvoiceDto>> getAmcDueInvoiceById(@PathVariable("id") int id) {
		Optional<DueInvoiceDto> dueinvoiceByIdd = amcDueInvoiceService.getAmcDueInvoiceById(id);
		if (dueinvoiceByIdd != null) {
			return ResponseEntity.ok(dueinvoiceByIdd);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No dueinvoice with entered id " + id)
				.body(dueinvoiceByIdd);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "deletedueinvoice/{id}")
	public void deleteDueInvoice(@PathVariable("id") int id) {
		amcDueInvoiceService.deleteDueInvoice(id);
	}

	@PutMapping("editdueinvoice/{id}")
	ResponseEntity<String> updateAmcDueInvoice(@RequestBody AmcDueInvoice amcDueInvoice) throws Exception {
		amcDueInvoiceService.updateAmcDueInvoice(amcDueInvoice);
		return ResponseEntity.ok("Succesfully edited");
	}

	@GetMapping("settled")
	public List<DueInvoiceDto> settled() {
		return amcDueInvoiceService.settled();
	}
	
	@GetMapping("finddueinvoiceclient/{id}")
	ResponseEntity<List<DueInvoiceDto>> getduebyClientId(@PathVariable("id") String id) {
		List<DueInvoiceDto> dueinvoiceByIdd = amcDueInvoiceService.getduebyClientId(id);
		if (dueinvoiceByIdd != null) {
			return ResponseEntity.ok(dueinvoiceByIdd);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No dueinvoice with entered id " + id)
				.body(dueinvoiceByIdd);
	}

}
