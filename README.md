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
  {
    "code": 1,
    "message": "Drivers fetched successully",
    "data": [
      {
        "id": 3,
        "first_name": "xyz",
        "last_name": "xyz",
        "status": "Active",
        "mobile": "9900000088",
        "gender": "male",
        "dob": "1990-05-14T18:30:00.000Z",
        "profile_pic": "amit.jpg",
        "email": "xyz@example.com",
        "password": "Xyz@12345",
        "current_address": "Current Address for xyz",
        "permanent_address": "Permanent Address for xyz",
        "city": "Xyz place",
        "state": "Xyz place anywhere",
        "zip_code": "110001",
        "ride_no": 1,
        "license": "DL-123456",
        "created_at": "2025-02-07T17:28:01.000Z",
        "updated_at": null,
        "ride_id": 1,
        "ride_type": "Auto",
        "fuel_type": "Electric",
        "auto_number": "PB08AX1234",
        "total_seats": 4,
        "number_of_wheels": 3
      }
    ]
  }
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
    "message": "Successfully Logged in",
    "data": ""
  }
  ```

#### **3. Driver Signup**
- **Endpoint:** `POST /api/driver/signup`
- **Description:** Registers a new driver.
- **Request Body:**
  ```json
  {
    "first_name": "Xyzzz",
    "last_name": "xyzzz",
    "mobile": "9002308800",
    "gender": "male",
    "dob": "2000-12-30",
    "profile_pic": "xyyzz.jpg",
    "email": "xyzz@xyyzz.com",
    "password": "Xyzzz@12345",
    "current_address": "Xyzz and xyz place at xyz",
    "permanent_address": "Xyzz and xyz place at xyz",
    "city": "Xyzz city",
    "state": "Xyzz state",
    "zip_code": "483775",
    "license": "UP4420150019783",
    "ride_type": "Auto",
    "fuel_type": "Petrol",
    "auto_number": "PB22VB7835",
    "total_seats": 5,
    "number_of_wheels": 3
  }
  ```
- **Response:**
  ```json
  {
    "code": 1,
    "message": "Driver registered successfully",
    "data": ""
  }
  ```

---

### **Customer APIs**

#### **1. Get Customer List**
- **Endpoint:** `GET /api/customer/show`
- **Description:** Fetches the list of all registered customers.
- **Response:**
  ```json
  {
    "code": 1,
    "message": "Customers fetched successully",
    "data": [
      {
        "id": 1,
        "name": "XYxzz",
        "status": "Inactive",
        "email": "xyzz@test.com",
        "mobile": "9090908989",
        "password": "xxyyzz@1234",
        "created_at": "2025-01-29T16:40:23.000Z",
        "updated_at": "2025-02-07T17:52:26.000Z"
      }
    ]
  }
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
    "message": "Successfully Logged in",
    "data": ""
  }
  ```

#### **3. Customer Signup**
- **Endpoint:** `POST /api/customer/signup`
- **Description:** Registers a new customer.
- **Request Body:**
  ```json
  {
    "name": "Xyyzz",
    "email": "xyzzz@test.com",
    "mobile": 8877665544,
    "password": "Xyzzz@12345"
  }
  ```
- **Response:**
  ```json
  {
    "code": 1,
    "message": "Customer registered Successfully",
    "data": ""
  }
  ```

---

## **Setup & Installation**

### **1. Clone the Repository**
```sh
git clone https://github.com/Rahul-Taak/GoRide.git
cd GoRide
```

### **2. Install Dependencies for Frontend**
```sh
cd frontend
npm install
```


### **3. Configure Environment Variables for Frontend**
Create a `.env` file in the frontend Folder and add:
```env
VITE_APP_NAME=GoRide
VITE_HOST=0.0.0.0
VITE_PORT=5000

```

### **4. Start the Admin Panel**
```sh
npm run dev
```

It will open on `http://localhost:5173`


### **5. Move one step back**
```sh
cd ..
```


### **6. Install Dependencies for Backend**
```sh
cd Backend
npm install
```


### **7. Configure Environment Variables for Backend**
Create a `.env` file in the Backend Folder and add:
```env
APP_NAME=GoRide
HOST=0.0.0.0
PORT=5000

DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=go_ride

```

### **8. Start the Server**
```sh
npm start
```

Server will run on `http://0.0.0.0:5000`

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
4. **Add, Commit, and Push Changes**
   ```sh
   git add .
   git commit -m "Updated backend logic and validation"
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
This project is ongoing under the **IT-Expert Team**.

---

## **Contact**
For any queries, reach out to **Rahul Taak** via GitHub: [Rahul-Taak](https://github.com/Rahul-Taak)

---
