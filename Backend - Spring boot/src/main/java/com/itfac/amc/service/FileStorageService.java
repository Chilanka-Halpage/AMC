package com.itfac.amc.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

	String storeFile(MultipartFile file,  String amcSerilaNo);

	Resource downloadFile(String fileName);
	
	public String upload(MultipartFile file, String amcSerilaNo);
	
	public byte[] getFile(String name);
}
