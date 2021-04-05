package com.itfac.amc.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

	String storeFile(MultipartFile file,  String amcSerilaNo);

	Resource downloadFile(String fileName);
}
