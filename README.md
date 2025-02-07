# GoRide Backend Admin Panel

## Introduction
GoRide is an online auto-rickshaw booking app. This repository contains the backend code for the **admin panel**, which manages drivers, customers, and ride details. The backend is built using **Node.js, Express, and MySQL**, providing API endpoints for user authentication, driver and customer management, and ride bookings.

---

## API Endpoints

### **Driver APIs**

#### **1. Get Driver List**
- **Endpoint:** `GET /api/driver/show`
- **Description:** Fetches the list of all registered drivers.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "mobile": "9000000000",
      "email": "john@example.com"
    }
  ]
  ```

#### **2. Driver Login**
- **Endpoint:** `POST /api/driver/login`
- **Description:** Allows a driver to log in.
- **Request Body:**
  ```json
  {
    "email": "xyz@xyz.com",
    "password": "Xyz@12345"
  }
  ```
- **Response:**
  ```json
  {
    "code": 1,
    "message": "Login successful",
    "token": "your-jwt-token"
  }
  ```

#### **3. Driver Signup**
- **Endpoint:** `POST /api/driver/signup`
- **Description:** Registers a new driver.
- **Request Body:**
  ```json
  {
    "first_name": "xyz",
    "last_name": "xyz",
    "mobile": "9000000000",
    "gender": "male",
    "dob": "2000-12-30",
    "profile_pic": "xyz.jpg",
    "email": "xyz@gmail.com",
    "password": "Xyz@12345",
    "current_address": "xyz xyz xyz",
    "permanent_address": "xyz xyz",
    "city": "65756",
    "state": "45465",
    "zip_code": "483775",
    "license": "UP4420150019783"
  }
  ```
- **Response:**
  ```json
  {
    "code": 1,
    "message": "Signup successful"
  }
  ```

---

### **Customer APIs**

#### **1. Get Customer List**
- **Endpoint:** `GET /api/customer/show`
- **Description:** Fetches the list of all registered customers.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@test.com",
      "mobile": "9000000000"
    }
  ]
  ```

#### **2. Customer Login**
- **Endpoint:** `POST /api/customer/login`
- **Description:** Allows a customer to log in.
- **Request Body:**
  ```json
  {
    "email": "xyz@test.com",
    "password": "Xyz@12345"
  }
  ```
- **Response:**
  ```json
  {
    "code": 1,
    "message": "Login successful",
    "token": "your-jwt-token"
  }
  ```

#### **3. Customer Signup**
- **Endpoint:** `POST /api/customer/signup`
- **Description:** Registers a new customer.
- **Request Body:**
  ```json
  {
    "name": "Xyzzz",
    "email": "xyz@test.com",
    "mobile": 3433242344,
    "password": "Xyzzz@1234"
  }
  ```
- **Response:**
  ```json
  {
    "code": 1,
    "message": "Signup successful"
  }
  ```

---

## **Setup & Installation**

### **1. Clone the Repository**
```sh
git clone https://github.com/Rahul-Taak/GoRide.git
cd GoRide
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the root directory and add:
```env
PORT=5000
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=goride_db
JWT_SECRET=your-secret-key
```

### **4. Start the Server**
```sh
npm start
```

Server will run on `http://localhost:5000`

---

## **Git Setup & Contribution Guidelines**

### **Git Commands for Remote Setup**
1. **Add Remote Repository**
   ```sh
   git remote add origin https://github.com/Rahul-Taak/GoRide.git
   ```
2. **Check Remote URL**
   ```sh
   git remote -v
   ```
3. **Pull Latest Changes Before Pushing**
   ```sh
   git pull --rebase origin master
   ```
4. **Push Code to GitHub**
   ```sh
   git push origin master
   ```

### **Ignore Sensitive Files**
Add `.env` to `.gitignore` to prevent accidental commits:
```sh
echo ".env" >> .gitignore
git rm --cached .env
git commit -m "Ignore .env file"
git push origin master
```

---

## **License**
This project is licensed under the **MIT License**.

---

## **Contact**
For any queries, reach out to **Rahul Taak** via GitHub: [Rahul-Taak](https://github.com/Rahul-Taak)

---
