package com.itfac.amc.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.itfac.amc.security.MyUserDetails;
import com.itfac.amc.security.MyUserDetailsService;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtFiter extends OncePerRequestFilter {

	@Autowired
	JwtUtil jwtUtil;

	@Autowired
	MyUserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String header = request.getHeader("Authorization");
			String userId = null;
			String jwt = null;

			if (header != null && header.startsWith("Bearer ")) {
				jwt = header.substring(7);
				userId = jwtUtil.extractUserId(jwt);
			}

			if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				MyUserDetails userDetails = (MyUserDetails) userDetailsService.loadUserByUsername(userId);
				if (jwtUtil.validateToken(jwt, userDetails)) {
					UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails,
							null, userDetails.getAuthorities());
					token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(token);
				}
			}
		} catch (ExpiredJwtException ex) {
			request.setAttribute("exception", ex);
			throw ex;
		} catch (BadCredentialsException ex) {
			request.setAttribute("exception", ex);
			throw ex;
		}
		filterChain.doFilter(request, response);

	}

}
