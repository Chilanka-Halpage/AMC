package com.itfac.amc.controller;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.dto.clinetpaymentDto;
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
	ResponseEntity<Optional<recieptDto>> getReceiptById(@PathVariable("id") String recNo) {
		Optional<recieptDto> receiptByIdd = receiptService.getReceiptById(recNo);
		if (receiptByIdd != null) {
			return ResponseEntity.ok(receiptByIdd);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No Receipts with entered id " + recNo)
				.body(receiptByIdd);
	}

	@GetMapping("getDate/{idname}")
	ResponseEntity<List<Date>> getDate(@PathVariable("idname") String id) throws Exception {

		List<Date> receiptDate = receiptService.getDate(id);
		return ResponseEntity.status(HttpStatus.OK).body(receiptDate);
	}

	@GetMapping("/lastyearrevanue/{Date1}/{Date2}")
	public String TotalrevanuelastYear(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2) {
		return receiptService.TotalrevanuelastYear(Date1, Date2);
	}

	@GetMapping("/last2yearrevanue/{Date1}/{Date2}")
	public String Totalrevanuelast2Year(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2) {
		return receiptService.Totalrevanuelast2Year(Date1, Date2);
	}

	@GetMapping("/last3yearrevanue/{Date1}/{Date2}")
	public String Totalrevanuelast3Year(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2) {
		return receiptService.Totalrevanuelast3Year(Date1, Date2);
	}

	@GetMapping("/last4yearrevanue/{Date1}/{Date2}")
	public String Totalrevanuelast4Year(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2) {
		return receiptService.Totalrevanuelast4Year(Date1, Date2);
	}

	@GetMapping("/last5yearrevanue/{Date1}/{Date2}")
	public String Totalrevanuelast5Year(
			@PathVariable(value = "Date1") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date1,
			@PathVariable(value = "Date2") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate Date2) {
		return receiptService.Totalrevanuelast5Year(Date1, Date2);
	}

	@GetMapping("findreceiptsforclient/{id}")
	public List<clinetpaymentDto> getReceiptByClientId(@PathVariable("id") String userId) {
		return receiptService.getReceiptbyClientId(userId);
	}
	
	@GetMapping("exists/{recNo}")
	public ResponseEntity<Boolean> existsReceipt(@PathVariable("recNo") String recNo) {
		boolean result = receiptService.doesReceiptExists(recNo);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

}
