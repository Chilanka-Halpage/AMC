package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Frequency;

public interface FrequencyService {

	List<Frequency> getAllFrequency();

	void deleteFrequency(int id);

	Optional<Frequency> getFrequencyById(int id);

}
