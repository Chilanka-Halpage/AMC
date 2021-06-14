package com.itfac.amc.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.itfac.amc.jwt.JwtAuthenticationEntryPoint;
import com.itfac.amc.jwt.JwtFiter;

@EnableWebSecurity()
public class WebSecurity extends WebSecurityConfigurerAdapter {

	@Autowired
	MyUserDetailsService userDetailsService;
	
	@Autowired
	JwtFiter jwtFiter;
	
	@Autowired
	JwtAuthenticationEntryPoint authenticationEntryPoint;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}
	
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
			.authorizeRequests()
			.antMatchers("/client/activeclient").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/client/**").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/clientDept/client/{userId}/departments").hasRole("CLIENT")
			.antMatchers("/clientDept/departmetncount/{userId}").hasRole("CLIENT")
			.antMatchers("/clientDept/**").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/amcMaster/get/client/{userId}").hasRole("CLIENT")
			.antMatchers("/amcMaster/AmcActiveCountforclient/{userId}").hasRole("CLIENT")
			.antMatchers("/amcMaster/AmcCountforclient/{userId}").hasRole("CLIENT")
			.antMatchers("/amcMaster/dashboard/AmcCountforclient/{userId}").hasRole("CLIENT")
			.antMatchers("/amcMaster/client/allamcno/{userId}").hasRole("CLIENT")
			.antMatchers("/amcMaster/dashboard/AmcActiveCountforclient/{userId}").hasRole("CLIENT")
			.antMatchers("/amcMaster/dashboard/**").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/amcMaster/**").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/amcSerial/add/{amcNo}").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/amcSerial/renew/{amcNo}").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/amcSerial/**").hasAnyRole("ADMIN", "AMC_COORDINATOR", "CLIENT")
			.antMatchers("/amcHistory/**").hasAnyRole("ADMIN", "AMC_COORDINATOR", "CLIENT")
			.antMatchers("/amcDueInvoice/deletedueinvoice/{id}").hasRole("ADMIN")
			.antMatchers("/amcDueInvoice/finddueinvoiceclient/{id}").hasRole("CLIENT")
			.antMatchers("/amcDueInvoice/**").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/Currency/deleteCurrency/{id}").hasRole("ADMIN")
			.antMatchers("/Currency/**").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/category/findActiveCategoy").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/category/deleteCategory/{id}").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/category/**").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/frequency/findActiveFrequency").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/frequency/deleteFrequency/{id}").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/frequency/**").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/api/images/getImage/{imageName:.+}").permitAll()
			.antMatchers("/api/images/**").authenticated()
			.antMatchers("/jrReport/client/**").hasRole("CLIENT")
			.antMatchers("/jrReport/PaymentsJrReport/{Date1}/{Date2}/{category}/{userId}").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/jrReport/QuarterWiseRevenueJrReport/{date1}/{category}/{userId}").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/jrReport/viewPdf/**").authenticated()
			.antMatchers("/jrReport/**").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/Product/deleteProduct/{id}").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/Product/findActiveProduct").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/Product/**").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/invoice/deleteinvoice/{id}").hasAnyRole("ADMIN", "ACCOUNTANT")
			.antMatchers("/invoice/totalamountpayble/{idname}").hasRole("CLIENT")
			.antMatchers("/invoice/**").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
	     	.antMatchers("/receipt/findreceiptsforclient/{id}").hasRole("CLIENT")
			.antMatchers("/receipt/findallreceipt").hasAnyRole("ADMIN", "AMC_COORDINATOR","ACCOUNTANT")
			.antMatchers("/receipt/getDate/{idname}").hasRole("CLIENT")
			.antMatchers("/receipt/dashboard/**").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/receipt/**").hasAnyRole("ADMIN", "ACCOUNTANT")
			.antMatchers("/report/dashboard/RenewelAmccountC/{id}/{Date1}/{Date2}").hasRole("CLIENT")
			.antMatchers("/report/client/getinvoicereport/{amcno}/{date}").hasRole("CLIENT")
			.antMatchers("/report/client/**").hasRole("CLIENT")
			.antMatchers("/report/PaymentReport/{Date1}/{Date2}/{category}").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/report/QuarterWiseRevenue/{Date1}/{category}").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/report/dashboard/**").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/report/**").hasAnyRole("ADMIN", "AMC_COORDINATOR")
			.antMatchers("/tax/**").hasAnyRole("ADMIN", "AMC_COORDINATOR", "ACCOUNTANT")
			.antMatchers("/tax/deleteTax/{id}").hasRole("ADMIN")
			.antMatchers("/User/admin/**").hasRole("ADMIN")
			.antMatchers("/User/getUname/{idname}").hasRole("CLIENT")
			.antMatchers("/User/forgot_password").permitAll()
			.antMatchers("/User/change_password/{token}").permitAll()
			.antMatchers("/User/logoutDetails/{userId}").permitAll()
			.antMatchers("/User/**").authenticated()
			.antMatchers("/notification/**").authenticated()
			.antMatchers("/authenticate").permitAll()
			.anyRequest().authenticated()
			.and().exceptionHandling()
	        .authenticationEntryPoint(authenticationEntryPoint)
			.and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(jwtFiter, UsernamePasswordAuthenticationFilter.class).cors();
	}
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
}
