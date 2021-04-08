package com.itfac.amc.entity;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;

@Data
public class AmcHistoryId implements Serializable {

	private static final long serialVersionUID = -2701901085338867021L;

	private String amcNo;
	private Date dateTime;
	private String fieldName;
}
