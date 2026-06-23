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

@WebServlet("/api/admin/delete")
public class DeleteDataServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
    	response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        String targetTable = request.getParameter("table");
        String idStr = request.getParameter("id");

        if (targetTable == null || idStr == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"status\":\"error\", \"message\":\"Missing deletion coordinates.\"}");
            return;
        }

        // Map short client keys to actual MySQL table names and primary columns safely
        String actualTable = "";
        String primaryKeyColumn = "";

        if (targetTable.equals("rooms")) {
            actualTable = "room_bookings";
            primaryKeyColumn = "booking_id";
        } else if (targetTable.equals("halls")) {
            actualTable = "hall_bookings";
            primaryKeyColumn = "hall_booking_id";
        } else if (targetTable.equals("contacts")) {
            actualTable = "contact_inquiries";
            primaryKeyColumn = "id";
        }

        if (actualTable.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"status\":\"error\", \"message\":\"Invalid target layout matrix.\"}");
            return;
        }

        // Build precise target purge query securely
        String sql = "DELETE FROM " + actualTable + " WHERE " + primaryKeyColumn + " = ?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, Integer.parseInt(idStr));
            int rowsDeleted = stmt.executeUpdate();

            if (rowsDeleted > 0) {
                out.print("{\"status\":\"success\", \"message\":\"Record purged permanently from core system ledger.\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print("{\"status\":\"error\", \"message\":\"Target file index index mapping not found.\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"status\":\"error\", \"message\":\"Purge execution exception occurred.\"}");
        }
    }

 // Paste this right below your doPost method inside DeleteDataServlet.java
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
    	response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}