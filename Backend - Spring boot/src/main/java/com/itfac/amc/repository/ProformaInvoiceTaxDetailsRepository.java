package com.itfac.amc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itfac.amc.entity.ProformaInvoiceTaxDetails;

@Repository
public interface ProformaInvoiceTaxDetailsRepository extends JpaRepository<ProformaInvoiceTaxDetails, Integer>{


}
