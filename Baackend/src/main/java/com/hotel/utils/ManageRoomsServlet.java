package com.hotel.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/admin/rooms")
public class ManageRoomsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        StringBuilder json = new StringBuilder("[");

        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM operational_rooms")) {
            
            boolean firstRoom = true;
            while (rs.next()) {
                if (!firstRoom) json.append(",");
                int roomId = rs.getInt("room_id");
                
                // FIX: Pass the precise unique database row ID instead of the shared room name!
                String nextAvailableDate = calculateNextAvailable(conn, roomId);

                json.append("{")
                    .append("\"id\":").append(roomId).append(",")
                    .append("\"name\":\"").append(rs.getString("room_name")).append("\",")
                    .append("\"beds\":").append(rs.getInt("bed_count")).append(",")
                    .append("\"type\":\"").append(rs.getString("climate_type")).append("\",")
                    .append("\"price\":").append(rs.getDouble("base_price")).append(",")
                    .append("\"capacity\":\"").append(rs.getString("capacity")).append("\",")
                    .append("\"image\":\"").append(rs.getString("image_url")).append("\",")
                    .append("\"description\":\"").append(rs.getString("description")).append("\",")
                    .append("\"nextAvailable\":\"").append(nextAvailableDate).append("\"")
                    .append("}");
                firstRoom = false;
            }
        } catch (Exception e) { e.printStackTrace(); }
        json.append("]");
        out.print(json.toString());
    }

    private String calculateNextAvailable(Connection conn, int roomId) {
        LocalDate today = LocalDate.now();
        // FIX: Look up historical leases matching this EXACT room variant ID index
        String sql = "SELECT check_in_date, check_out_date FROM room_bookings WHERE room_id = ? AND check_out_date >= ? ORDER BY check_in_date ASC";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, roomId);
            stmt.setString(2, today.toString());
            
            ArrayList<LocalDate[]> bookings = new ArrayList<>();
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    bookings.add(new LocalDate[]{
                        LocalDate.parse(rs.getString("check_in_date")),
                        LocalDate.parse(rs.getString("check_out_date"))
                    });
                }
            }
            
            if (bookings.isEmpty()) return "Available Today";

            LocalDate candidate = today;
            boolean conflict = true;
            
            while (conflict) {
                conflict = false;
                for (LocalDate[] b : bookings) {
                    if (!candidate.isBefore(b[0]) && candidate.isBefore(b[1])) {
                        candidate = b[1]; 
                        conflict = true;
                        break;
                    }
                }
            }
            
            if (candidate.equals(today)) return "Available Today";
            return "Available from " + candidate.toString();
            
        } catch (Exception e) {
            return "Check Inventory";
        }
    }

    private String calculateNextAvailable(Connection conn, String roomName) {
        LocalDate today = LocalDate.now();
        String sql = "SELECT check_in_date, check_out_date FROM room_bookings WHERE room_name = ? AND check_out_date >= ? ORDER BY check_in_date ASC";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, roomName);
            stmt.setString(2, today.toString());
            
            ArrayList<LocalDate[]> bookings = new ArrayList<>();
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    bookings.add(new LocalDate[]{
                        LocalDate.parse(rs.getString("check_in_date")),
                        LocalDate.parse(rs.getString("check_out_date"))
                    });
                }
            }
            
            // If no active or future bookings, it's available today!
            if (bookings.isEmpty()) return "Available Today";

            LocalDate candidate = today;
            boolean conflict = true;
            
            while (conflict) {
                conflict = false;
                for (LocalDate[] b : bookings) {
                    // Check if candidate date falls inside an existing booking range [check_in, check_out)
                    if (!candidate.isBefore(b[0]) && candidate.isBefore(b[1])) {
                        candidate = b[1]; // Jump to the checkout date of this booking
                        conflict = true;
                        break;
                    }
                }
            }
            
            if (candidate.equals(today)) return "Available Today";
            return "Available from " + candidate.toString();
            
        } catch (Exception e) {
            return "Check Inventory";
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        String action = request.getParameter("action");

        try (Connection conn = DBConnection.getConnection()) {
            if ("delete".equals(action)) {
                String id = request.getParameter("id");
                String sql = "DELETE FROM operational_rooms WHERE room_id = ?";
                try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                    stmt.setInt(1, Integer.parseInt(id));
                    stmt.executeUpdate();
                    out.print("{\"status\":\"success\"}");
                }
            } else {
                // Add Room matching the full schema definitions
                String sql = "INSERT INTO operational_rooms (room_name, bed_count, climate_type, base_price, capacity, image_url, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
                try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                    stmt.setString(1, request.getParameter("name"));
                    stmt.setInt(2, Integer.parseInt(request.getParameter("beds")));
                    stmt.setString(3, request.getParameter("type"));
                    stmt.setDouble(4, Double.parseDouble(request.getParameter("price")));
                    stmt.setString(5, request.getParameter("capacity"));
                    stmt.setString(6, request.getParameter("image"));
                    stmt.setString(7, request.getParameter("description"));
                    stmt.executeUpdate();
                    out.print("{\"status\":\"success\"}");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(500);
            out.print("{\"status\":\"error\"}");
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
    	response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}