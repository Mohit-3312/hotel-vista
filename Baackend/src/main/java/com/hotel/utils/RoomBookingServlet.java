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

@WebServlet("/api/book/room")
public class RoomBookingServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        String guestName = request.getParameter("guestName");
        String guestEmail = request.getParameter("guestEmail");
        String guestPhone = request.getParameter("guestPhone");
        String roomName = request.getParameter("selectedRoomName");
        String climateType = request.getParameter("type");
        String bedCount = request.getParameter("beds");
        String checkIn = request.getParameter("checkIn");
        String checkOut = request.getParameter("checkOut");
        String totalPrice = request.getParameter("totalPrice");
        String roomIdStr = request.getParameter("roomId");
        String type = request.getParameter("type");
        String beds = request.getParameter("beds");

        if (guestName == null || guestName.trim().length() < 3 || checkIn == null || checkOut == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"status\":\"error\", \"message\":\"Invalid booking form parameters.\"}");
            return;
        }

        // 1. THE CHECKPOINT: SQL formula to detect if dates overlap with any existing booking for this room
        String checkConflictSql = "SELECT COUNT(*) FROM room_bookings WHERE room_id = ? AND NOT (check_out_date <= ? OR check_in_date >= ?)";
        String insertSql = "INSERT INTO room_bookings (room_id, guest_name, guest_email, guest_phone, room_name, type, beds, check_in_date, check_out_date, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DBConnection.getConnection()) {
            
            // First, run the conflict query
            try (PreparedStatement checkStmt = conn.prepareStatement(checkConflictSql)) {
            	checkStmt.setInt(1, Integer.parseInt(roomIdStr));
            	checkStmt.setString(2, checkIn);
            	checkStmt.setString(3, checkOut);
                
                try (ResultSet rs = checkStmt.executeQuery()) {
                    if (rs.next() && rs.getInt(1) > 0) {
                        // ⚠️ COLLISION DETECTED! Block submission immediately
                        response.setStatus(HttpServletResponse.SC_CONFLICT); // HTTP 409 Conflict
                        out.print("{\"status\":\"conflict\", \"message\":\"This luxury suite is completely occupied during your chosen dates! Please try an alternative timeline.\"}");
                        return;
                    }
                }
            }

            // 2. NO CONFLICT: Proceed to safely drop data row into database
            try (PreparedStatement stmt = conn.prepareStatement(insertSql)) {
            	stmt.setInt(1, Integer.parseInt(request.getParameter("roomId")));
                stmt.setString(2, guestName.trim());
                stmt.setString(3, guestEmail.trim());
                stmt.setString(4, guestPhone.trim());
                stmt.setString(5, roomName);
                stmt.setString(6, type);
                stmt.setInt(7, Integer.parseInt(beds));
                stmt.setString(8, checkIn);
                stmt.setString(9, checkOut);
                stmt.setDouble(10, Double.parseDouble(totalPrice));

                int rows = stmt.executeUpdate();
                if (rows > 0) {
                    out.print("{\"status\":\"success\", \"message\":\"Your staying luxury suite has been locked in successfully!\"}");
                } else {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    out.print("{\"status\":\"error\", \"message\":\"Failed to commit reservation.\"}");
                }
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"status\":\"error\", \"message\":\"Database error checking timeline integrity.\"}");
        }
    }

    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}