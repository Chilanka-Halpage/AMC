package com.itfac.amc.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.apache.commons.io.IOUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.itfac.amc.service.ImageService;

@Service
public class ImageServiceImpl implements ImageService{

    public final String storageDirectoryPath = "C:\\Users\\Acer\\Desktop\\New folder";
    public ResponseEntity<String> uploadToLocalFileSystem(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path storageDirectory = Paths.get(storageDirectoryPath);
        // if the folder does not exist
        if(!Files.exists(storageDirectory)){ 
            try {
                Files.createDirectories(storageDirectory);
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        Path destination = Paths.get(storageDirectory.toString() + "\\" + fileName);
        try {
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

        } catch (IOException e) {
            e.printStackTrace();
        }
        // the response will be the download URL of the image
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("api/images/getImage/")
                .path(fileName)
                .toUriString();
        // return the download image url as a response entity
        return ResponseEntity.ok(fileDownloadUri);
    }
    // retrieve the image by its name
    public  byte[] getImageWithMediaType(String imageName) throws IOException {
        Path destination =   Paths.get(storageDirectoryPath+"\\"+imageName);
        return IOUtils.toByteArray(destination.toUri());
    }
}
