package com.erp.HirePilot.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.erp.HirePilot.security.JwtAuthenticationFilter;



@Configuration
@EnableWebSecurity 
@EnableMethodSecurity
public class SecurityConfig {
	 private final AuthenticationProvider authenticationProvider;
	    private final JwtAuthenticationFilter jwtAuthenticationFilter;

	    public SecurityConfig(
	            JwtAuthenticationFilter jwtAuthenticationFilter,
	            AuthenticationProvider authenticationProvider
	    ) {
	        this.authenticationProvider = authenticationProvider;
	        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	    }

	    @Bean
	    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {

	        http
	            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	            .csrf(csrf -> csrf.disable())
	            .authorizeHttpRequests(auth -> auth
	                .requestMatchers( "/auth/**","/candidate/**","/admin/**","/api/**").permitAll()
	               // .requestMatchers("/Candidateprofile/**").hasAuthority("USER") 
	                .anyRequest().authenticated()
	            )
	            .sessionManagement(session -> session
	                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	            )
	            .authenticationProvider(authenticationProvider) // Ensure it's a bean
	            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Ensure it's a bean

	        return http.build();
	    }

	
	
	
@Bean
CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of(
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
    ));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of(
        "Authorization",
        "Content-Type",
        "Origin",
        "x-user-id"  // ✅ Add this custom header
    ));
    configuration.setExposedHeaders(List.of("Authorization"));
    configuration.setAllowCredentials(true); // ✅ allow cookies / headers if needed

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
	
}
