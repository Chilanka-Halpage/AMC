package com.itfac.amc.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.azure.storage.blob.BlobClientBuilder;
import com.itfac.amc.service.FileStorageService;

@Service
public class FileStorageServiceImpl implements FileStorageService {

	@Autowired
	BlobClientBuilder client;

	public String upload(MultipartFile file, String amcSerilaNo) {
		if (file != null && file.getSize() > 0) {
			try {
				String fileName = StringUtils.cleanPath(amcSerilaNo + "-" + file.getOriginalFilename());
				client.blobName(fileName).buildClient().upload(file.getInputStream(), file.getSize());
				String url = ServletUriComponentsBuilder.fromCurrentContextPath().path("amcSerial/download/")
						.path(fileName).toUriString();
				return url;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public byte[] getFile(String name) {
		try {
			File temp = new File(name);
			client.blobName(name).buildClient().downloadToFile(temp.getPath());
			byte[] content = Files.readAllBytes(Paths.get(temp.getPath()));
			temp.delete();
			return content;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
