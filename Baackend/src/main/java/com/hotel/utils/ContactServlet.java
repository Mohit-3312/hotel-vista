package com.hotel.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// This annotation maps the servlet to this specific URL endpoint
@WebServlet("/api/contact")
public class ContactServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // 1. Enable Cross-Origin Resource Sharing (CORS) so your React frontend can talk to it
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Vite standard port
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        // 2. Extract form parameters sent from frontend
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String department = request.getParameter("department");
        String message = request.getParameter("message");

        // 3. Server-Side Validation (To impress your project examiner!)
        if (name == null || name.trim().length() < 3 || phone == null || phone.trim().length() != 10) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"status\":\"error\", \"message\":\"Server-side validation failed. Invalid data inputs.\"}");
            return;
        }

        // 4. Database Insertion Logic using JDBC
        String sql = "INSERT INTO contact_inquiries (name, email, phone, department, message) VALUES (?, ?, ?, ?, ?)";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            // Binding parameters securely to prevent SQL Injection
            stmt.setString(1, name.trim());
            stmt.setString(2, email.trim());
            stmt.setString(3, phone.trim());
            stmt.setString(4, department);
            stmt.setString(5, message.trim());

            int rowsInserted = stmt.executeUpdate();
            
            if (rowsInserted > 0) {
                response.setStatus(HttpServletResponse.SC_OK);
                out.print("{\"status\":\"success\", \"message\":\"Memorandum successfully logged into database!\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.print("{\"status\":\"error\", \"message\":\"Failed to write data to database record.\"}");
            }
            
        }catch (Exception e) {
        e.printStackTrace(); // This prints the full error in your Eclipse console window!
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        // Safe hardcoded JSON that will never break syntax
        out.print("{\"status\":\"error\", \"message\":\"Database execution failed. Check Eclipse console logs!\"}");
    }
    }

    // Handle CORS pre-flight requests safely
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}