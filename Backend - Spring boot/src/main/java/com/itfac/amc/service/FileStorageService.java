package com.itfac.amc.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
	
	public String upload(MultipartFile file, String amcSerilaNo);
	
	public byte[] getFile(String name);
}
