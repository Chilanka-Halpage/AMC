package com.itfac.amc.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.entity.Frequency;
import com.itfac.amc.service.FrequencyService;
import com.itfac.amc.validation.OnCreate;
import com.itfac.amc.validation.OnUpdate;

@RestController
@RequestMapping("frequency/")
public class FrequencyController {

	@Autowired
	FrequencyService frequencyservice;

	@GetMapping("findAllFrequency")
	public ResponseEntity <List<Frequency>> getAllFrequency() {
		List<Frequency> allFrequency= frequencyservice.getAllFrequency();
		return ResponseEntity.status(HttpStatus.OK).body(allFrequency);
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

	@DeleteMapping("deleteFrequency/{id}")
	public ResponseEntity<String> deleteFrequency(@PathVariable("id") int frequencyId) throws Exception {
		try {
			frequencyservice.deleteFrequency(frequencyId);;
		    return ResponseEntity.ok().body("delete done");
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body("can not delete since, already id use as a foriegn key.");
		}
	}

	@PostMapping("AddFrequency")
	public ResponseEntity<String> addFrequency(@Validated(OnCreate.class) @RequestBody Frequency frequency,HttpServletRequest httpServletRequest) {
		Frequency frequencyy=frequencyservice.getByFrequency(frequency);
		if(frequencyy == null) {
		frequencyservice.addFrequency(frequency,httpServletRequest);
		return ResponseEntity.status(HttpStatus.OK).body("added successfull"); 
		}else {
			return ResponseEntity.badRequest().body("Frequency already exist.");
		}
		
	}

	@PutMapping("updateFrequency/{id}")
	public ResponseEntity<String> updateFrequency(@PathVariable("id") int frequencyId,@Validated(OnUpdate.class) @RequestBody Frequency frequency) {
		 frequencyservice.updateFrequency(frequency,frequencyId);
		 return ResponseEntity.status(HttpStatus.OK).body("update successfull");
	}
	
	@GetMapping("exists/{name}")
	public ResponseEntity<Boolean> existsFrequency(@PathVariable("name") String frequency) {
		boolean result = frequencyservice.doesFrequencyExists(frequency);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@GetMapping("findActiveFrequency")
	public List<Frequency> getActiveFrequency() {
		return frequencyservice.getActiveFrequency();
	}

}
