package com.itfac.amc.service;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    public ResponseEntity<?> uploadToLocalFileSystem(MultipartFile file) ;
    public  byte[] getImageWithMediaType(String imageName) throws IOException;

}