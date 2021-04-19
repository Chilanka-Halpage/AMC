package com.itfac.amc.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.Frequency;
import com.itfac.amc.service.FrequencyService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("frequency/")
public class FrequencyController {

	@Autowired
	FrequencyService frequencyservice;

	@GetMapping("findAllFrequency")
	List<Frequency> getAllFrequency() {
		return frequencyservice.getAllFrequency();
	}

	@GetMapping("findFrequency/{id}")
	ResponseEntity<Optional<Frequency>> getFrequencyById(@PathVariable("id") int frequencyId) {
		Optional<Frequency> frequencyByIdd = frequencyservice.getFrequencyById(frequencyId);
		if (frequencyByIdd != null) {
			return ResponseEntity.ok(frequencyByIdd);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No category with entered id " + frequencyId)
				.body(frequencyByIdd);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "deleteFrequency/{id}")
	public void deleteFrequency(@PathVariable("id") int frequencyId) {
		frequencyservice.deleteFrequency(frequencyId);

	}

	@PostMapping("AddFrequency")
	public Frequency addFrequency(@Validated @RequestBody Frequency frequency) {
		return frequencyservice.addFrequency(frequency);
	}

	@PutMapping("updateFrequency/{id}")
	public Frequency updateFrequency(@Validated @RequestBody Frequency frequency) {
		return frequencyservice.updateFrequency(frequency);
	}
	@GetMapping("findActiveFrequency")
	public List<Frequency> getActiveFrequency() {
		return frequencyservice.getActiveFrequency();
	}

}
