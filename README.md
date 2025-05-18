# GoRide Backend Admin Panel

## Introduction

GoRide is an online auto-rickshaw booking app. This repository contains the backend code for the **admin panel**, which manages drivers, customers, and ride details. The backend is built using **Node.js, Express, and MySQL**, providing API endpoints for user authentication, driver and customer management, and ride bookings.

---

## API Endpoints

### **Driver APIs**

#### **1. Get Driver List**

- **Endpoint:** `GET /api/driver/show`
- **Description:** Fetches the list of all registered drivers.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```
- **Response:**
  ```json
  {
    "code": 1,
    "status": 200,
    "message": "Drivers fetched successfully",
    "total": 1,
    "data": [
      {
        "id": 3,
        "first_name": "xxyyzz",
        "last_name": "xxyyzz",
        "mobile": "9999888877",
        "email": "xxyyzz@example.com",
        "status": "Active",
        "gender": "male",
        "city": "xxyyzz city",
        "state": "xxyyzz state",
        "zip_code": "555666",
        "license": "DL-123456",
        "profile_pic": "xxyyzz.jpg",
        "dob": "1990-05-14T18:30:00.000Z",
        "ride_id": 1,
        "ride_type": "Auto",
        "fuel_type": "Electric",
        "ride_number": "DL08AX1234",
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
    "status": 200,
    "message": "Successfully Logged in",
    "data": {
      "token": "YOUR_ACCESS_TOKEN",
      "driver": {
        "id": 7,
        "first_name": "Xxyyzz",
        "last_name": "Xxyyzz",
        "mobile": "9988776655",
        "email": "Xxyyzz@Xxyyzz.com",
        "status": "Active",
        "dob": "2005-02-11T18:30:00.000Z",
        "profile_pic": "Xxyyzz.jpg",
        "ride_no": 7,
        "ride_type": "Car",
        "fuel_type": "Electric",
        "ride_number": "PB08AX1234",
        "total_seats": 5,
        "number_of_wheels": 4
      }
    }
  }
  ```

#### **3. Driver Signup**

- **Endpoint:** `POST /api/driver/signup`
- **Description:** Registers a new driver.
- **Request Body:**

  ```json
  {
    "first_name": "Xxyyzz",
    "last_name": "Xxyyzz",
    "status": "Active",
    "mobile": "9988776655",
    "gender": "male",
    "dob": "2005-02-12",
    "profile_pic": "Xxyyzz.jpg",
    "email": "xyyzz@Xxyyzz.com",
    "password": "Xxyyzz@12345",
    "current_address": "Xxyyzz address",
    "permanent_address": "Xxyyzz address",
    "city": "Xxyyzz city",
    "state": "Xxyyzz state",
    "zip_code": "777888",
    "ride_no": 1,
    "license": "PB4420150019783",
    "ride_id": 1,
    "ride_type": "Bike",
    "fuel_type": "Electric",
    "ride_number": "PB08AX1234",
    "total_seats": 2,
    "number_of_wheels": 2
  }
  ```

- **Response:**

  ```json
  {
    "code": 1,
    "status": 201,
    "message": "Driver registered successfully",
    "data": {
      "driver_id": 1
    }
  }
  ```

---

### **Customer APIs**

#### **1. Get Customer List**

- **Endpoint:** `GET /api/customer/show`
- **Description:** Fetches the list of all registered customers.
- **Headers:**

  ```json
  {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```

- **Response:**

  ```json
  {
    "code": 1,
    "status": 200,
    "message": "Customers fetched successfully",
    "total": 1,
    "data": [
      {
        "id": 1,
        "name": "Xxyyzz",
        "status": "Inactive",
        "email": "xyyzz@yyzz.com",
        "mobile": "9988776644"
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
    "status": 200,
    "message": "Successfully logged in",
    "data": {
      "token": "YOUR_ACCESS_TOKEN",
      "customer": {
        "id": 5,
        "name": "Xxyyzz",
        "email": "xyyzz@xyyzz.com",
        "mobile": "9977664455",
        "status": "Active"
      }
    }
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
    "status": 201,
    "message": "Customer registered successfully",
    "data": {
      "customer_id": 1
    }
  }
  ```

#### **4. Customer Login with Google**

- **Endpoint:** `POST /api/customer/google-login`
- **Description:** Signup a new Customer and Login with google ID.
- **Request Body:**

  ```json
  {
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "name": "xxyyzz xyz",
    "email": "xyz@examplme.com",
    "mobile": 9977883366
  }
  ```

- **Response:**

  ```json
  {
    "code": 1,
    "status": 200,
    "message": "Google login successful",
    "data": {
      "token": "your-jwt-token",
      "customer": {
        "id": 23,
        "name": "xxyyzz xyz",
        "email": "xyz@examplme.com",
        "mobile": "9977883366",
        "status": "Active"
      }
    }
  }
  ```

#### **5. Customer Profile - Fetch**

- **Endpoint:** `GET /api/customer/profile/{customer_id}`
- **Description:** Fetch customer profile.
- **Headers:**

  ```json
  {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```

- **Response:**

  ```json
  {
    "code": 1,
    "stauts": 200,
    "message": "Customer profile fetched successfully",
    "total": 1,
    "data": [
      {
        "id": 11,
        "name": "Xxyyz xyz",
        "status": "Active",
        "email": "xyyzz@gmail.com",
        "mobile": "9999988888",
        "password": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "uuid": null,
        "last_login": "2025-05-18T14:18:06.000Z",
        "profile_pic": null,
        "created_at": "2025-03-05T16:45:35.000Z",
        "updated_at": "2025-05-18T14:18:06.000Z"
      }
    ]
  }
  ```

#### **6. Customer Profile - Update**

- **Endpoint:** `POST /api/customer/update-profile/{customer_id}`
- **Description:** Update customer profile.
- **Headers:**

  ```json
  {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```

- **Request Body:**

  ```json
  {
    "name": "XXYyxzzz",
    "email": "xxyyzzzx@gmail.com",
    "mobile": "9922773388",
    "password": "Xxxyzy@12345"
  }
  ```

- **Response:**

  ```json
  {
    "code": 1,
    "status": 201,
    "message": "Customer profile updated successfully",
    "data": null
  }
  ```

#### **7. Fetch Ride Types**

- **Endpoint:** `GET /api/customer/ride-types`
- **Description:** Fetch available ride types.
- **Headers:**

  ```json
  {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```

- **Response:**

  ```json
  {
    "code": 1,
    "stauts": 200,
    "message": "Ride types fetched successfully",
    "total": 3,
    "data": [
      {
        "ride_type": "Auto"
      },
      {
        "ride_type": "Car"
      },
      {
        "ride_type": "Bike"
      }
    ]
  }
  ```

#### **8. Fetch All Rides**

- **Endpoint:** `GET /api/customer/ride-list/{ride_type}`
- **Description:** Fetch all available rides of given type.
- **Headers:**

  ```json
  {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```

- **Response:**

  ```json
  {
    "code": 1,
    "stauts": 200,
    "message": "Rides fetched successfully",
    "total": 2,
    "data": [
      {
        "ride_id": 14,
        "ride_type": "Car",
        "fuel_type": "Diesel",
        "ride_number": "PB08BX99XX",
        "total_seats": 5,
        "number_of_wheels": 4,
        "created_at": "2025-05-18T13:27:27.000Z",
        "updated_at": null
      },
      {
        "ride_id": 15,
        "ride_type": "Car",
        "fuel_type": "CNG",
        "ride_number": "PB08BX81XX",
        "total_seats": 8,
        "number_of_wheels": 4,
        "created_at": "2025-05-18T13:28:24.000Z",
        "updated_at": null
      }
    ]
  }
  ```

#### **9. Fetch Ride Details**

- **Endpoint:** `GET /api/customer/ride-details/{ride_id}`
- **Description:** Fetch specific ride details.
- **Headers:**

  ```json
  {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```

- **Response:**

  ```json
  {
    "code": 1,
    "stauts": 200,
    "message": "Ride details fetched successfully",
    "total": 1,
    "data": [
      {
        "ride_id": 13,
        "ride_type": "Auto",
        "fuel_type": "Diesel",
        "ride_number": "PB08BX19XX",
        "total_seats": 4,
        "number_of_wheels": 3,
        "created_at": "2025-03-10T17:18:35.000Z",
        "updated_at": "2025-05-18T13:28:00.000Z"
      }
    ]
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

VITE_BACKEND_URL=http://0.0.0.0:5000
VITE_FRONTEND_URL=http://0.0.0.0:5173

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
APP_HOST=0.0.0.0
APP_PORT=5000

REACT_HOST=0.0.0.0
REACT_PORT=5173

FREE_BACKEND_URL=http://0.0.0.0:5000
FREE_FRONTEND_URL=http://0.0.0.0:5173

DB_HOST=your-online-database-host
DB_NAME=your-online-database-name
DB_USER=your-online-database-username
DB_PASSWORD=your-online-database-password
DB_PORT=3306

LOCAL_DB_HOST=localhost
LOCAL_DB_NAME=go_ride
LOCAL_DB_USER=your-database-username
LOCAL_DB_PASSWORD=your-database-password
LOCAL_DB_PORT=3306

JWT_SECRET_KEY=your-jwt-secret-key
MY_GMAIL=your-gmail-account
MY_PASSWORD=your-gmail-password
MY_APP_PASSWORD=your-gmail-app-password

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

## **Setup & Installation**

Follow the instructions to set up the backend and frontend environments.

## **Authorization Implementation**

- After successful login (Driver or Customer), you will receive a **JWT token** in the response.
- You must include this token in the `Authorization` header as `Bearer YOUR_ACCESS_TOKEN` when making requests to protected APIs (like `GET /api/driver/show` and `GET /api/customer/show`).
- If the token is invalid or missing, the API will return an `Unauthorized` error.

---

## **License**

This project is ongoing under the **IT-Expert Team**.

---

## **Contact**

For any queries, reach out to **Rahul Taak** via GitHub: [Rahul-Taak](https://github.com/Rahul-Taak)

---
