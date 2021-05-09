package com.itfac.amc.service.impl;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

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

	@Override
	public Frequency addFrequency(Frequency frequency,HttpServletRequest httpServletRequest) {
		String ipAddress = httpServletRequest.getRemoteAddr();
		frequency.setSavedIp(ipAddress);
		return frequencyrepo.save(frequency);
	}

	@Override
	public void updateFrequency(Frequency frequency,int frequencyId) {
		Frequency frequencyy=frequencyrepo.findByFrequencyId(frequencyId);
		frequencyy.setFrequency(frequency.getFrequency());
		frequencyy.setActive(frequency.isActive());
		 frequencyrepo.save(frequencyy);
	}

	@Override
	public List<Frequency> getActiveFrequency() {
		return frequencyrepo.getActiveFrequency();
	}

}
