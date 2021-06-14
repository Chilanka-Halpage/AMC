package com.itfac.amc.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.itfac.amc.service.ImageService;

@RestController
@RequestMapping(value = "api/images/")
public class ImageController {

	@Autowired
	public ImageService imageService;

	@PostMapping(value = "upload")
	public ResponseEntity<?> uploadImage(@RequestParam MultipartFile file) {
		return this.imageService.uploadToLocalFileSystem(file);
	}

	@GetMapping(value = "getImage/{imageName:.+}", produces = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_GIF_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable(name = "imageName") String fileName)
			throws IOException {
		return this.imageService.getImageWithMediaType(fileName);
	}

}