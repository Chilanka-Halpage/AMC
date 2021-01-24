package com.example.demo.service_Imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.UserRepository;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@Service
public class UserServiceImp implements UserService{
	
	@Autowired
	UserRepository userrepo;
	
	@Override
	public List<User> getAllUser() {
		List<User> findAlluser = userrepo.findAll();
		return findAlluser;
	}
	
	@Override
	public Optional<User> getUserById(String id) {
		Optional<User> finduserById=userrepo.findById(id);
		return finduserById;
	}
	@Override
	public void deleteUser(String id) {
		userrepo.deleteById(id);
	}

}
