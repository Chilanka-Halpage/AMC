package com.itfac.amc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itfac.amc.entity.AmcHistory;
import com.itfac.amc.entity.AmcHistoryId;

public interface AmcHistoryRepository extends JpaRepository<AmcHistory, AmcHistoryId> {

	List<AmcHistory> findByAmcNo(String amcNo);

}
