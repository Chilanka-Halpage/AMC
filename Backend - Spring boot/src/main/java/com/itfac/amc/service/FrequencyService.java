package com.itfac.amc.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.itfac.amc.entity.Frequency;

public interface FrequencyService {

	List<Frequency> getAllFrequency();

	void deleteFrequency(int id);

	Optional<Frequency> getFrequencyById(int id);

	List<Frequency> getActiveFrequency();

	void updateFrequency(Frequency frequency, int frequencyId);

	Frequency addFrequency(Frequency frequency, HttpServletRequest httpServletRequest);

	boolean doesFrequencyExists(String frequency);

	Frequency getByFrequency(Frequency frequency);

}
