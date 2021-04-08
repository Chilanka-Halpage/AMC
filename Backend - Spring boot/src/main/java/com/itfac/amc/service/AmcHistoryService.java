package com.itfac.amc.service;

import java.util.List;

import com.itfac.amc.entity.AmcHistory;

public interface AmcHistoryService {

	List<AmcHistory> getHistoryByAmcNo(String amcNo);
}
