package com.itfac.amc.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.itfac.amc.dto.AmcFullDataDto;
import com.itfac.amc.dto.AmcSerialDto;
import com.itfac.amc.dto.addRecieptDto;
import com.itfac.amc.service.AmcSerialService;
import com.itfac.amc.service.FileStorageService;

@RestController()
@RequestMapping("amcSerial/")
public class AmcSerialController {

	@Autowired
	AmcSerialService amcSerialService;

	@Autowired
	FileStorageService fileStorageService;

	@PostMapping("add/{amcNo}")
	public ResponseEntity<String> addNewAmcSerial(@RequestParam("data") String amcSerial,
			@RequestParam("file") MultipartFile file, @PathVariable(value = "amcNo") String amcNo)
			throws JsonMappingException, JsonProcessingException {
		amcSerialService.addAmcSerialByAmcNo(amcSerial, file, amcNo);
		return ResponseEntity.status(HttpStatus.OK).body("Successfully Saved");
	}

	@PostMapping("renew/{amcNo}/{amcSerialNo}")
	public ResponseEntity<String> renewAmc(HttpServletRequest request, @RequestParam("data") String data,
			@RequestParam("file") MultipartFile file, @PathVariable(value = "amcNo") String amcNo,
			@PathVariable(value = "amcSerialNo") String amcSerialNo)
			throws JsonMappingException, JsonProcessingException {
		amcSerialService.renewAmc(request, data, file, amcNo, amcSerialNo);
		return ResponseEntity.status(HttpStatus.OK).body(("Successfully Saved!"));
	}

	@GetMapping("get/clients/depts/{deptNo}")
	public ResponseEntity<List<AmcSerialDto>> getAmcByDepartmentNo(@PathVariable(value = "deptNo") int deptNo) {
		List<AmcSerialDto> amcList = amcSerialService.getAmcByDepartment(deptNo);
		return ResponseEntity.status(HttpStatus.OK).body(amcList);
	}

	@GetMapping("get/clients/amcs/{amcNo}")
	public ResponseEntity<AmcFullDataDto> getAmcFullDataByAmcNo(@PathVariable(value = "amcNo") String amcNo) {
		AmcFullDataDto amcFullData = amcSerialService.getAmcFullDataByAmcNo(amcNo);
		return ResponseEntity.status(HttpStatus.OK).body(amcFullData);
	}

	@GetMapping("get/depts/amcs/{amcSerialNo}")
	public ResponseEntity<AmcFullDataDto> getAmcFullDataByAmSerialcNo(
			@PathVariable(value = "amcSerialNo") String amcSerialNo) {
		AmcFullDataDto amcFullData = amcSerialService.getAmcFullDataByAmcSerialNo(amcSerialNo);
		return ResponseEntity.status(HttpStatus.OK).body(amcFullData);
	}

	@GetMapping("/download/{fileName}")
	ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
		Resource resource = fileStorageService.downloadFile(fileName);
		String mimeType;
		try {
			mimeType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException e) {
			mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
		}
		mimeType = mimeType == null ? MediaType.APPLICATION_OCTET_STREAM_VALUE : mimeType;
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(mimeType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline;fileName=" + resource.getFilename()).body(resource);
	}
	
	@GetMapping("get/recietde/{amc_serial}")
	public ResponseEntity<addRecieptDto> getdetalis(@PathVariable(value = "amc_serial") String amcSNo) throws Exception{
		addRecieptDto receiptde = amcSerialService.getdetalis(amcSNo);
		return ResponseEntity.status(HttpStatus.OK).body(receiptde);
	}
}
