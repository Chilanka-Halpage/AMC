package com.itfac.amc.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.ProformaInvoiceDto;
import com.itfac.amc.entity.ProformaInvoice;
import com.itfac.amc.reportData.GetInvoice;

@Repository
public interface ProformaInvoiceRepository extends JpaRepository<ProformaInvoice, String> {

	void deleteByPiNo(String id);

	@Query(value = "SELECT * FROM proforma_invoice", nativeQuery = true)
	List<ProformaInvoiceDto> getProformainvoices();
	
	@Query(value = "SELECT * FROM proforma_invoice where pi_no = :piNo", nativeQuery = true)
	Optional<ProformaInvoiceDto> getProformaInvoiceById(@Param("piNo") String pi_no);

	// getInvoice-------------------------------------------
	@Query(value = "select * from get_invoice where amc_no= :amcNo", nativeQuery = true)
	List<GetInvoice> getInvoiceById(@Param("amcNo") String amc_no);

	// get Total Payble Amount-------------------------------------------
	@Query(value = "select sum(pi.total_amount) from proforma_invoice pi, client_department cd, client c, user u where pi.client_dept_id = cd.dept_id and cd.client_id = c.client_id and c.user_id = u.user_id and u.user_id = :userId", nativeQuery = true)
	BigDecimal getPiAmountById(@Param("userId") String userId);

	@Query(value = "select sum(r.total) from receipt r, client_department cd, client c, user u where r.client_dept_id = cd.dept_id and cd.client_id = c.client_id and c.user_id = u.user_id and u.user_id = :userId", nativeQuery = true)
	BigDecimal getAmountById(@Param("userId") String userId);

	//get active invoices-------------------------------------------
	@Query(value = "select * from proforma_invoice where cancel = false", nativeQuery = true)
	List<ProformaInvoiceDto> getActiveinvoices();
}
