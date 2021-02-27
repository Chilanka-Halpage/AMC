package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import com.itfac.amc.entity.Frequency;

public interface FrequencyService {

	List<Frequency> getAllFrequency();

	void deleteFrequency(int id);

	Optional<Frequency> getFrequencyById(int id);

}
