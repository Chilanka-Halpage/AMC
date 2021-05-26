package com.itfac.amc.service.impl;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.azure.storage.blob.BlobClientBuilder;
import com.azure.storage.blob.models.BlobProperties;
import com.itfac.amc.service.FileStorageService;

@Service
public class FileStorageServiceImpl implements FileStorageService {

	@Autowired
	BlobClientBuilder client;
	private Path fileStoragePath;
	private String fileStorageLocation;

	@Value("${file.storage.location}")
	public void createStoragePath(String fileStorageLocation) {
		this.fileStorageLocation = fileStorageLocation;
		fileStoragePath = Paths.get(fileStorageLocation).toAbsolutePath().normalize();
		try {
			Files.createDirectories(fileStoragePath);
		} catch (IOException e) {
			throw new RuntimeException("Issue in creating file directory");
		}
	}

	@Override
	public String storeFile(MultipartFile file, String amcSerilaNo) {
		String fileName = StringUtils.cleanPath(amcSerilaNo + "-" + file.getOriginalFilename());
		Path filePath = Paths.get(fileStoragePath + "/" + fileName);
		String url;
		try {
			Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
			url = ServletUriComponentsBuilder.fromCurrentContextPath().path("amcSerial/download/").path(fileName)
					.toUriString();
		} catch (IOException e) {
			throw new RuntimeException("Issue in storing the file", e);
		}
		return url;
	}

	@Override
	public Resource downloadFile(String fileName) {
		Path path = Paths.get(fileStorageLocation).toAbsolutePath().resolve(fileName);
		Resource resource;
		try {
			resource = new UrlResource(path.toUri());
		} catch (MalformedURLException e) {
			throw new RuntimeException("Issue in reading the file", e);
		}

		if (resource.exists() && resource.isReadable()) {
			return resource;
		} else {
			throw new RuntimeException("the file doesn't exist or not readable");
		}
	}

	public String upload(MultipartFile file, String amcSerilaNo) {
		if (file != null && file.getSize() > 0) {
			try {
				// implement your own file name logic.
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
