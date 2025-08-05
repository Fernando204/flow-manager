package com.flow.manager.utils;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.flow.manager.Models.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;

@Component
public class JwtCookie {
    private static final String password = "secret_key_ultra_secret_key_with_234_characteres";

    private Key getSingningKey(){
        return Keys.hmacShaKeyFor(password.getBytes());
    }

    public String generateToken(User user){
        return Jwts.builder()
        .setSubject(user.getId())
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 604800 * 1000))
        .signWith(getSingningKey(), SignatureAlgorithm.HS256)
        .compact();
    }   

    public String validadeAndGetId(String token){
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(getSingningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();

        return claims.getSubject();
    }
}
