package com.itfac.amc.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

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

import com.itfac.amc.dto.ProformaInvoiceDto;
import com.itfac.amc.entity.ProformaInvoice;
import com.itfac.amc.service.ProformaInvoiceService;

@RestController
@RequestMapping("/invoice")
public class ProformaInvoiceController {

	@Autowired
	private ProformaInvoiceService proformaInvoiceService;

	@GetMapping("/findAllInvoices")
	public List<ProformaInvoiceDto> getAllProformaInvoice() {
		return proformaInvoiceService.getAllProformaInvoice();
	}

	@PostMapping("/add")
	ResponseEntity<String> addProformInvoice(HttpServletRequest httpServletRequest,
			@RequestBody ProformaInvoice proformaInvoice) throws Exception {
		proformaInvoiceService.addProformaInvoice(httpServletRequest, proformaInvoice);
		return ResponseEntity.ok("Succesfully added");
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "deleteinvoice/{id}")
	public void deleteInvoice(@PathVariable("id") String piNo) {
		proformaInvoiceService.deleteInvoice(piNo);
	}

	@GetMapping("findinvoice/{id}")
	ResponseEntity<Optional<ProformaInvoiceDto>> getProformaInvoiceById(@PathVariable("id") String piNo) {
		Optional<ProformaInvoiceDto> invoiceByIdd = proformaInvoiceService.getProformaInvoiceById(piNo);
		if (invoiceByIdd != null) {
			return ResponseEntity.ok(invoiceByIdd);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No invoice with entered piNo " + piNo)
				.body(invoiceByIdd);
	}

	/* get total amount payble--------------------------------- */
	@GetMapping("/totalamountpayble/{idname}")
	public ResponseEntity<Map<String, BigDecimal>> totalPaybleAmount(@PathVariable("idname") String idname) {

		Map<String, BigDecimal> result = proformaInvoiceService.totalPaybleAmount(idname);
		return ResponseEntity.status(HttpStatus.OK).body(result);

	}
	
	@GetMapping("/activeinvoices")
	public List<ProformaInvoiceDto> getActiveinvoices(){
	  return proformaInvoiceService.getActiveinvoices();
	}
	
	@PutMapping("editinvoice/{id}")
		ResponseEntity<String> updateAmcDueInvoice(@RequestBody ProformaInvoice proformaInvoice)throws Exception {
			 proformaInvoiceService.updateProformainvoiceInvoice(proformaInvoice);	
			return ResponseEntity.ok("Succesfully edited");
		
	}
}
