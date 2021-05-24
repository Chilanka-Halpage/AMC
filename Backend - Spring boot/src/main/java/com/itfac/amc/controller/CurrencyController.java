package com.itfac.amc.controller;

import java.util.List;
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

import com.itfac.amc.entity.Currency;
import com.itfac.amc.service.Currencyservice;

@RestController
@RequestMapping("/Currency")
public class CurrencyController {

	@Autowired
	Currencyservice currencyservice;

	@GetMapping("findAllCurrency")
	public ResponseEntity<List<Currency>>  getAllCurrency() {
		List<Currency> result =  currencyservice.getAllCurrency();
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("findCurrency/{id}")
	ResponseEntity<Optional<Currency>> getCaurrencyById(@PathVariable("id") int currencyId) {
		Optional<Currency> currencyByIdd = currencyservice.getCurrencyById(currencyId);
		if (currencyByIdd != null) {
			return ResponseEntity.ok(currencyByIdd);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Des", "No currency with entered id " + currencyId)
				.body(currencyByIdd);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "deleteCurrency/{id}")
	public ResponseEntity<String> deleteCurrency(@PathVariable("id") int currencyId)throws Exception {
	   try {	currencyservice.deleteCurrency(currencyId);
	          return ResponseEntity.ok().body("succesfully delete");
	          }
	   catch(Exception e) {
		   return ResponseEntity.badRequest().body("can not delete, Currency Already in use");
	   }
	}

	@PostMapping("/add")
	ResponseEntity<Currency> addCurrency(HttpServletRequest httpServletRequest, @RequestBody Currency currency)throws Exception {
		Currency newCurrency = currencyservice.addCurrency(httpServletRequest, currency);
		return ResponseEntity.ok(newCurrency);
	}

	@GetMapping("/findactivecurrencies")
	public ResponseEntity<List<Currency>> getActivecurrencies() {
		List<Currency> result = currencyservice.getActivecurrencies();
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("exists/{name}")
	public ResponseEntity<Boolean> existsCurrency(@PathVariable("name") String currencyName) {
		boolean result = currencyservice.doesCurrencyExists(currencyName);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@PutMapping("updateCurrency/{id}")
	public Currency updateCurrency(HttpServletRequest httpServletRequest, @RequestBody Currency currency) {
		return currencyservice.updateCurrency(httpServletRequest, currency);
	}

}


