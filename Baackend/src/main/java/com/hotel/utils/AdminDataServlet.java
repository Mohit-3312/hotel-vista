package com.hotel.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/admin/dashboard")
public class AdminDataServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

     // Paste these right at the start of your doGet method:
    	response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        StringBuilder json = new StringBuilder("{");

        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement()) {
            
            // 1. FETCH CONTACT INQUIRIES
            json.append("\"contacts\":[");
            try (ResultSet rs = stmt.executeQuery("SELECT * FROM contact_inquiries ORDER BY id DESC")) {
                boolean first = true;
                while (rs.next()) {
                    if (!first) json.append(",");
                    json.append(String.format("{\"id\":%d,\"name\":\"%s\",\"email\":\"%s\",\"phone\":\"%s\",\"msg\":\"%s\"}",
                        rs.getInt("id"), rs.getString("name"), rs.getString("email"), rs.getString("phone"), rs.getString("message")));
                    first = false;
                }
            }
            json.append("],");

            // 2. FETCH ROOM BOOKINGS
            json.append("\"rooms\":[");
            try (ResultSet rs = stmt.executeQuery("SELECT * FROM room_bookings ORDER BY booking_id DESC")) {
                boolean first = true;
                while (rs.next()) {
                    if (!first) json.append(",");
                    json.append(String.format("{\"id\":%d,\"name\":\"%s\",\"room\":\"%s\",\"checkIn\":\"%s\",\"checkOut\":\"%s\",\"price\":%.2f}",
                        rs.getInt("booking_id"), rs.getString("guest_name"), rs.getString("room_name"), rs.getString("check_in_date"), rs.getString("check_out_date"), rs.getDouble("total_price")));
                    first = false;
                }
            }
            json.append("],");

            // 3. FETCH HALL BOOKINGS
            json.append("\"halls\":[");
            try (ResultSet rs = stmt.executeQuery("SELECT * FROM hall_bookings ORDER BY hall_booking_id DESC")) {
                boolean first = true;
                while (rs.next()) {
                    if (!first) json.append(",");
                    json.append(String.format("{\"id\":%d,\"name\":\"%s\",\"venue\":\"%s\",\"date\":\"%s\",\"days\":%d,\"price\":%.2f}",
                        rs.getInt("hall_booking_id"), rs.getString("client_name"), rs.getString("venue_name"), rs.getString("event_date"), rs.getInt("lease_days"), rs.getDouble("total_price")));
                    first = false;
                }
            }
            json.append("]");

        } catch (Exception e) {
            e.printStackTrace();
        }

        json.append("}");
        out.print(json.toString());
    }
}
