package com.hotel.utils;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

	// Standard XAMPP database configurations
    private static final String URL = "jdbc:mysql://localhost:3306/hotel-system";
    private static final String USERNAME = "root";
    private static final String PASSWORD = ""; // XAMPP MySQL has no password by default
    private static final String DRIVER_CLASS = "com.mysql.cj.jdbc.Driver";
	
    public static Connection getConnection() {
        Connection conn = null;
        try {
            // Load the MySQL Driver class into memory
            Class.forName(DRIVER_CLASS);
            // Establish and return the raw connection bridge
            conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return conn;
    }
    
}
