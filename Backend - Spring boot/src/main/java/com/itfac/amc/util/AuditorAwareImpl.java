package com.itfac.amc.util;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;

public class AuditorAwareImpl implements AuditorAware<String> {

	@Override
	public Optional<String> getCurrentAuditor() {

		/*Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}

		String userName = ((MyUserDetails) authentication.getPrincipal()).getUsername();
		return Optional.of(userName);*/
		return Optional.of("chilankaSH");
	}
}
