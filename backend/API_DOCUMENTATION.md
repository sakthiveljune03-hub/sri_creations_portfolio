# Cinematic Portfolio Backend API Documentation

This document describes the REST API endpoints for the Cinematic Portfolio Backend. 

## Base URL
- Local Development: `http://localhost:5000/api`
- Production (Render): `https://your-render-backend.onrender.com/api`

---

## 🔒 Authentication Flow
All modifying endpoints (`POST`, `PUT`, `DELETE`) and administration lists require JWT authorization.
1. Authenticate by making a request to `POST /api/auth/login`.
2. Extract the `token` from the response.
3. Attach it to the `Authorization` header on all protected requests:
   ```http
   Authorization: Bearer <your_jwt_token>
   ```

---

## 📂 Endpoints Reference

### 1. Authentication (`/api/auth`)

#### **POST** `/login`
Authenticate admin login credentials.
- **Access**: Public
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "admin@cinematicportfolio.com",
    "password": "AdminPassword123!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "admin": {
        "_id": "64b0f0b4d45d3e0012ab34cd",
        "name": "Portfolio Admin",
        "email": "admin@cinematicportfolio.com",
        "role": "Admin"
      }
    }
  }
  ```

#### **GET** `/profile`
Fetch current logged-in admin details.
- **Access**: Protected (Admin)
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Profile fetched successfully",
    "data": {
      "_id": "64b0f0b4d45d3e0012ab34cd",
      "name": "Portfolio Admin",
      "email": "admin@cinematicportfolio.com",
      "role": "Admin",
      "createdAt": "2026-07-19T17:37:47.000Z"
    }
  }
  ```

---

### 2. Projects (`/api/projects`)

#### **GET** `/`
Retrieve all projects sorted by display order.
- **Access**: Public
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Projects retrieved successfully",
    "data": [
      {
        "_id": "64b0f2a5d45d3e0012ab35ef",
        "title": "Cinematic Showcase 2026",
        "category": "Commercial",
        "description": "High end commercial shoot for luxury vehicle brand.",
        "client": "Audi",
        "year": 2026,
        "technologies": ["Red Digital", "DaVinci Resolve"],
        "videoUrl": "https://res.cloudinary.com/xdzjp4sb/video/upload/v1721200000/cinematic_portfolio/sample.mp4",
        "thumbnail": "https://res.cloudinary.com/xdzjp4sb/image/upload/v1721200000/cinematic_portfolio/sample.jpg",
        "featured": true,
        "order": 1,
        "createdAt": "2026-07-19T17:40:00.000Z"
      }
    ]
  }
  ```

#### **GET** `/:id`
Retrieve details of a single project by MongoDB ID.
- **Access**: Public
- **Response (200 OK)**:
  *(Same object model as above inside `data`)*

#### **POST** `/`
Create a new project.
- **Access**: Protected (Admin)
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "title": "Cinematic Showcase 2026",
    "category": "Commercial",
    "description": "High end commercial shoot for luxury vehicle brand.",
    "client": "Audi",
    "year": 2026,
    "technologies": ["Red Digital", "DaVinci Resolve"],
    "videoUrl": "https://res.cloudinary.com/xdzjp4sb/video/upload/v1721200000/sample.mp4",
    "thumbnail": "https://res.cloudinary.com/xdzjp4sb/image/upload/v1721200000/sample.jpg",
    "featured": true,
    "order": 1
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Project created successfully",
    "data": {
      "_id": "64b0f2a5d45d3e0012ab35ef",
      "title": "Cinematic Showcase 2026",
      "category": "Commercial",
      "description": "High end commercial shoot...",
      ...
    }
  }
  ```

#### **PUT** `/:id`
Modify metadata of an existing project. All fields in request body are optional.
- **Access**: Protected (Admin)
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "title": "Audi Commercial - Final Cut",
    "featured": false
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Project updated successfully",
    "data": { ... }
  }
  ```

#### **DELETE** `/:id`
Remove a project record.
- **Access**: Protected (Admin)
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Project deleted successfully",
    "data": null
  }
  ```

---

### 3. Testimonials (`/api/testimonials`)

#### **GET** `/`
Retrieve testimonials list.
- **Access**: Public
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Testimonials retrieved successfully",
    "data": [
      {
        "_id": "64b0f5efd45d3e0012ab36a1",
        "clientName": "John Doe",
        "company": "Audi Corp",
        "designation": "Marketing Director",
        "review": "Antigravity did an exceptional job with our commercial!",
        "profileImage": "https://res.cloudinary.com/xdzjp4sb/image/upload/v1721200000/avatar.jpg",
        "rating": 5,
        "createdAt": "2026-07-19T17:41:00.000Z"
      }
    ]
  }
  ```

#### **POST** `/`
Submit a new review record.
- **Access**: Protected (Admin)
- **Request Body**:
  ```json
  {
    "clientName": "John Doe",
    "company": "Audi Corp",
    "designation": "Marketing Director",
    "review": "Antigravity did an exceptional job with our commercial!",
    "profileImage": "https://res.cloudinary.com/xdzjp4sb/image/upload/v1721200000/avatar.jpg",
    "rating": 5
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Testimonial created successfully",
    "data": { ... }
  }
  ```

#### **PUT** `/:id`
Modify details of a testimonial.
- **Access**: Protected (Admin)
- **Request Body**:
  ```json
  {
    "rating": 4
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Testimonial updated successfully",
    "data": { ... }
  }
  ```

#### **DELETE** `/:id`
Remove a testimonial.
- **Access**: Protected (Admin)
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Testimonial deleted successfully",
    "data": null
  }
  ```

---

### 4. Bookings (`/api/bookings`)

#### **POST** `/`
Submit contact inquiry/booking request.
- **Access**: Public
- **Request Body**:
  ```json
  {
    "name": "Jane Smith",
    "email": "janesmith@gmail.com",
    "phone": "+1234567890",
    "projectType": "Music Video",
    "message": "We would like to shoot a 3-minute music video in Miami."
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Booking Submitted Successfully"
  }
  ```

#### **GET** `/`
Retrieve list of all booking requests.
- **Access**: Protected (Admin)
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Bookings retrieved successfully",
    "data": [
      {
        "_id": "64b0f8acd45d3e0012ab37fa",
        "name": "Jane Smith",
        "email": "janesmith@gmail.com",
        "phone": "+1234567890",
        "projectType": "Music Video",
        "message": "We would like to shoot a 3-minute music video in Miami.",
        "status": "Pending",
        "createdAt": "2026-07-19T17:42:00.000Z"
      }
    ]
  }
  ```

---

### 5. Media Upload (`/api/upload`)

#### **POST** `/image`
Upload an image to Cloudinary folder.
- **Access**: Protected (Admin)
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data`
- **Request Body**:
  - `file`: Binary image file (JPEG, PNG, WebP)
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Image uploaded successfully",
    "url": "https://res.cloudinary.com/xdzjp4sb/image/upload/v1721200000/cinematic_portfolio/sample.jpg",
    "public_id": "cinematic_portfolio/sample",
    "data": {
      "url": "https://res.cloudinary.com/xdzjp4sb/image/upload/v1721200000/cinematic_portfolio/sample.jpg",
      "public_id": "cinematic_portfolio/sample"
    }
  }
  ```

#### **POST** `/video`
Upload a video file to Cloudinary.
- **Access**: Protected (Admin)
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data`
- **Request Body**:
  - `file`: Binary video file (MP4, WebM)
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Video uploaded successfully",
    "url": "https://res.cloudinary.com/xdzjp4sb/video/upload/v1721200000/cinematic_portfolio/sample.mp4",
    "public_id": "cinematic_portfolio/sample_video",
    "data": {
      "url": "https://res.cloudinary.com/xdzjp4sb/video/upload/v1721200000/cinematic_portfolio/sample.mp4",
      "public_id": "cinematic_portfolio/sample_video"
    }
  }
  ```
