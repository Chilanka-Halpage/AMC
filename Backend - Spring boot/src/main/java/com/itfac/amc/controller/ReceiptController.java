package com.itfac.amc.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.dto.recieptDto;
import com.itfac.amc.entity.Receipt;
import com.itfac.amc.service.ReceiptService;

@RestController
@RequestMapping("/receipt")
@CrossOrigin("*")
public class ReceiptController {

	@Autowired
	private ReceiptService receiptService;

	@GetMapping("/findallreceipt")
	public List<recieptDto> getAllReceipt() {
		return receiptService.getAllReceipt();
	}

	@PostMapping("/add")
	ResponseEntity<String> addReceipt(HttpServletRequest httpServletRequest, @RequestBody Receipt receipt)
			throws Exception {
		receiptService.addReceipt(httpServletRequest, receipt);
		return ResponseEntity.ok("Succesfully added");
	}

	@GetMapping("findreceipt/{id}")
	ResponseEntity<Optional<recieptDto>> getAmcDueInvoiceById(@PathVariable("id") String recNo) {
		Optional<recieptDto> receiptByIdd = receiptService.getReceiptById(recNo);
		if (receiptByIdd != null) {
			return ResponseEntity.ok(receiptByIdd);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No dueinvoice with entered id " + recNo)
				.body(receiptByIdd);
	}

	@GetMapping("getDate/{idname}")
	ResponseEntity<List<Date>> getDate(@PathVariable("idname") String id) throws Exception {

		List<Date> receiptDate = receiptService.getDate(id);
		return ResponseEntity.status(HttpStatus.OK).body(receiptDate);

	}

}
