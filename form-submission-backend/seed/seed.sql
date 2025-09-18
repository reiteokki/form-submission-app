CREATE DATABASE IF NOT EXISTS customer_db;

USE customer_db;

CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  form_filled BOOLEAN DEFAULT FALSE,
  phone_number VARCHAR(50),
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO customers (name, email, password, form_filled, phone_number, image)
VALUES 
(NULL, 'demo@example.com', '$2b$10$sdXlg2tK8kT9CSCzYCzcM.IotTyTcHgII9TLezW4DWoinTMBqlq6C', FALSE, NULL, NULL);
