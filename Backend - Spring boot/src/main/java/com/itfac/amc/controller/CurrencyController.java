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
	public List<Currency> getAllCurrency() {
		return currencyservice.getAllCurrency();
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
	public void deleteCurrency(@PathVariable("id") int currencyId) {
		currencyservice.deleteCurrency(currencyId);
	}

	@PostMapping("/add")
	ResponseEntity<Currency> addCurrency(HttpServletRequest httpServletRequest, @RequestBody Currency currency)
			throws Exception {
		Currency newCurrency = currencyservice.addCurrency(httpServletRequest, currency);
		System.out.println(currency);
		return ResponseEntity.ok(newCurrency);
	}

	@GetMapping("/findactivecurrencies")
	public List<Currency> getActivecurrencies() {
		return currencyservice.getActivecurrencies();
	}
	
	@GetMapping("exists/{name}")
	public ResponseEntity<Boolean> existsCurrency(@PathVariable("name") String currencyName) {
		boolean result = currencyservice.doesCurrencyExists(currencyName);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

}
