package com.itfac.amc.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itfac.amc.dto.DueInvoicecheckDto;
import com.itfac.amc.dto.ProformaInvoiceDto;
import com.itfac.amc.entity.ProformaInvoice;
import com.itfac.amc.entity.Receipt;
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
	@Query(value = "select * from proforma_invoice where cancel = false and amc_no = :amcNo", nativeQuery = true)
	List<ProformaInvoiceDto> getActiveinvoicesById(@Param("amcNo") String amc_no);
	
	boolean existsById(String piNo);
	
	@Query(value = "SELECT p.pi_date,p.pi_no,p.total_amount,p.total_payble_lkr,p.currency_id,p.amc_no, f.frequency from proforma_invoice p, frequency f where p.frequency_id = f.frequency_id", nativeQuery = true)
	List<DueInvoicecheckDto> Proformainvoicecheck();
    
	@Query(value = "select rec_no from receipt where pi_no = :piNo and rec_date BETWEEN :Date1 and :Date2", nativeQuery = true)
    Receipt checkdueInvoices(@Param("piNo") String pi_no,@Param("Date1") LocalDate Date1, @Param("Date2") LocalDate Date2);
	
	
	// getInvoice-------------------------------------------
	@Query(value = "select * from get_invoices where amc_no= :amcNo and pi_date=:pi_date", nativeQuery = true)
	List<GetInvoice> getInvoiceByIdAndDate(@Param("amcNo") String amc_no,@Param("pi_date") LocalDate pi_date);

}

