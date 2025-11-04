package com.erp.HirePilot.dto;

public class AuthResponseDto {
	private String name;
    private String email;
    private String role;
    private String token;
    private Integer id;

    public String getName() {
		return name;
	}


	public String getEmail() {
		return email;
	}

	

	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public void setName(String name) {
		this.name = name;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public AuthResponseDto(String name, String email, String role,Integer id,String token) {
        this.token = token;
        this.role = role;
        this.name=name;
        this.email=email;
        this.id=id;
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
}
