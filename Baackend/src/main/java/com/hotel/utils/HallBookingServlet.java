package com.hotel.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/book/hall")
public class HallBookingServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // 1. Setup CORS & Content Typings so React can safely speak to it
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        // 2. Pull down input keys forwarded from React's state parameters
        String clientName = request.getParameter("clientName");
        String clientEmail = request.getParameter("clientEmail");
        String clientPhone = request.getParameter("clientPhone");
        String venueName = request.getParameter("selectedVenueName");
        String eventType = request.getParameter("eventType");
        String eventDate = request.getParameter("eventDate"); // Format: YYYY-MM-DD
        String leaseDays = request.getParameter("days");
        String totalPrice = request.getParameter("totalPrice");

        // 3. Fallback Validation check
        if (clientName == null || eventDate == null || venueName == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"status\":\"error\", \"message\":\"Missing critical structural booking values.\"}");
            return;
        }

        // SQL Query 1: The Gatekeeper Collision Matrix Check
     // SQL Query 1: Overlap logic checking if dates crash within an active lease window
        String checkConflictSql = "SELECT COUNT(*) FROM hall_bookings WHERE venue_name = ? AND " +
                                  "(event_date <= DATE_ADD(?, INTERVAL ? - 1 DAY) AND " +
                                  "DATE_ADD(event_date, INTERVAL lease_days - 1 DAY) >= ?)";
        
        // SQL Query 2: The Safe execution insert row
        String insertSql = "INSERT INTO hall_bookings (client_name, client_email, client_phone, venue_name, event_type, event_date, lease_days, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DBConnection.getConnection()) {
            
            // PHASE A: Double check date availability
        	try (PreparedStatement checkStmt = conn.prepareStatement(checkConflictSql)) {
        	    checkStmt.setString(1, venueName);
        	    checkStmt.setString(2, eventDate); // ? 1: New booking start date
        	    checkStmt.setInt(3, Integer.parseInt(leaseDays)); // ? 2: New booking lease duration
        	    checkStmt.setString(4, eventDate); // ? 3: New booking start date again

        	    try (ResultSet rs = checkStmt.executeQuery()) {
        	        if (rs.next() && rs.getInt(1) > 0) {
        	            response.setStatus(HttpServletResponse.SC_CONFLICT); 
        	            out.print("{\"status\":\"error\", \"message\":\"⚠️ Timeline Collision: This hall is already locked inside an active lease window during those dates!\"}");
        	            return;
        	        }
        	    }
        	}

            // PHASE B: If clean count = 0, execute the row entry safely
            try (PreparedStatement insertStmt = conn.prepareStatement(insertSql)) {
                insertStmt.setString(1, clientName.trim());
                insertStmt.setString(2, clientEmail.trim());
                insertStmt.setString(3, clientPhone.trim());
                insertStmt.setString(4, venueName);
                insertStmt.setString(5, eventType);
                insertStmt.setString(6, eventDate);
                insertStmt.setInt(7, Integer.parseInt(leaseDays));
                insertStmt.setDouble(8, Double.parseDouble(totalPrice));

                int rowsInserted = insertStmt.executeUpdate();
                if (rowsInserted > 0) {
                    out.print("{\"status\":\"success\", \"message\":\"Grand Banquet event space has been successfully reserved under your timeline ledger!\"}");
                } else {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    out.print("{\"status\":\"error\", \"message\":\"Failed to append contract values to rows.\"}");
                }
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"status\":\"error\", \"message\":\"Database communication exception occurred. Check Eclipse log window!\"}");
        }
    }

    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}