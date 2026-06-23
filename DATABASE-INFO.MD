# 🗄️ Database Setup Guide — Hotel Vista

This document contains everything you need to configure the backend relational storage layer for this project. Follow the steps below to initialize the exact database schema used by the Tomcat Servlets.

---

## ⚙️ Environment Prerequisites
Before running the SQL scripts, ensure your local deployment server matches these configuration specifications:

* **Database Management System:** XAMPP (MySQL / MariaDB)
* **Target Port:** `3306`
* **Database Schema Name:** `hotel-system`
* **Default Connection File Location:** `src/com/hotel/utils/DBConnection.java`

---

## 🚀 Initialization Steps

1. Open your local XAMPP Control Panel and start **Apache** and **MySQL**.
2. Navigate to your browser and open **phpMyAdmin**: `http://localhost/phpmyadmin/`.
3. Click on the **Databases** tab, type **`hotel-system`** in the database name field, and click **Create**.
4. Select the newly created `hotel-system` database from the sidebar layout.
5. Click on the **SQL** tab in the top navigation bar.
6. Copy the master schema script below, paste it into the query window, and click **Go**.

---

## 🛠️ Master Database Generation Script

```sql
-- =========================================================================
-- MASTER HOTEL SYSTEM SCHEMAS FOR ACTIVE DEPLOYMENT MODULES
-- =========================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS room_bookings;
DROP TABLE IF EXISTS hall_bookings;
DROP TABLE IF EXISTS operational_rooms;
DROP TABLE IF EXISTS contact_messages;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. LIVE ROOM INVENTORY TABLE (CATALOG STORAGE)
CREATE TABLE operational_rooms (
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(100) NOT NULL,
    bed_count INT NOT NULL,
    climate_type VARCHAR(50) NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    capacity VARCHAR(50) NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. SECURE ROOM BOOKINGS LEDGER (COLLISION DETECTOR TIMELINE)
CREATE TABLE room_bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    guest_name VARCHAR(100) NOT NULL,
    guest_email VARCHAR(100) NOT NULL,
    guest_phone VARCHAR(20) NOT NULL,
    room_name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    beds INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES operational_rooms(room_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. BANQUET HALL BOOKINGS TRANSACTION TABLE
CREATE TABLE hall_bookings (
    hall_booking_id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_email VARCHAR(100) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    venue_name VARCHAR(100) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    lease_days INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. CONTACT MESSAGE SUPPORT TICKETS TABLE
CREATE TABLE contact_messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(100) NOT NULL,
    sender_email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message_text TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
