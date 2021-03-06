package com.itfac.amc.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itfac.amc.entity.Frequency;
import com.itfac.amc.repository.FrequencyRepository;
import com.itfac.amc.service.FrequencyService;

@Service
public class FrequencyServiceImp implements FrequencyService {

	@Autowired
	FrequencyRepository frequencyrepo;

	@Override
	public List<Frequency> getAllFrequency() {
		List<Frequency> findAllFrequency = frequencyrepo.findAll();
		return findAllFrequency;
	}

	@Override
	public void deleteFrequency(int id) {
		frequencyrepo.deleteById(id);

	}

	@Override
	public Optional<Frequency> getFrequencyById(int id) {
		Optional<Frequency> findById = frequencyrepo.findById(id);
		return findById;

	}

}
