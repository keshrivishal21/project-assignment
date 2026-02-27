# Project Assignment – Scalable REST API with JWT Authentication & RBAC

## 🚀 Project Overview

This project implements a scalable REST API using Spring Boot with:

- JWT-based authentication
- Role-Based Access Control (USER / ADMIN)
- CRUD operations for Task entity
- Global exception handling
- Swagger API documentation
- React (Vite) frontend integration

The system is stateless and designed with scalability and clean architecture in mind.

## 🛠 Tech Stack

### Backend
- Java 17
- Spring Boot 3
- Spring Security
- JWT (jjwt)
- Spring Data JPA
- PostgreSQL
- Swagger (SpringDoc)

### Frontend
- React (Vite)
- Axios
- React Router DOM

### Database
- PostgreSQL

## 🏗 Architecture

Controller → Service → Repository → Database

Security Layer:
- JWT Filter
- Stateless Authentication
- Role-Based Authorization

Versioning:
- Global context path: /api/v1

## 🔐 Authentication Flow

1. User registers via /auth/register
2. User logs in via /auth/login
3. Server returns JWT
4. Client sends JWT in Authorization header
5. JWT Filter validates token
6. Access granted to protected endpoints

## 📡 API Endpoints

### Authentication
POST   /api/v1/auth/register
POST   /api/v1/auth/login

### Tasks (Protected)
POST   /api/v1/tasks
GET    /api/v1/tasks
PUT    /api/v1/tasks/{id}
DELETE /api/v1/tasks/{id}

## ▶ How to Run

### Backend
1. Configure PostgreSQL database
2. Update application.properties
3. Run Spring Boot application

Swagger:
http://localhost:8080/api/v1/swagger-ui/index.html

### Frontend
1. cd frontend
2. npm install
3. npm run dev


## 🛡 Security Practices

- BCrypt password hashing
- Stateless JWT authentication
- Role-based access control
- Ownership validation
- Global exception handling
- Input validation with @Valid


## 📈 Scalability & Deployment Considerations

### 1. Stateless Architecture
The system uses JWT-based stateless authentication.
This allows horizontal scaling without session replication.

### 2. Horizontal Scaling
Multiple instances of the application can be deployed behind a load balancer.
Since no server-side session is stored, requests can be handled by any instance.

### 3. Database Optimization
- Indexed email column for fast authentication lookup
- Proper foreign key constraints
- Can use connection pooling (HikariCP)

### 4. Caching Layer (Optional)
Redis can be introduced for:
- Caching frequent task queries
- Token blacklisting if logout mechanism is required

### 5. Containerization
Application can be containerized using Docker for consistent deployment across environments.

### 6. Microservices Migration
The application can be split into:
- Auth Service
- Task Service
- API Gateway

JWT makes service-to-service authentication simple.

### 7. Logging & Monitoring
Production deployment would include:
- Centralized logging (ELK stack)
- Metrics monitoring (Prometheus + Grafana)

### 8. Cloud Deployment
Can be deployed on:
- AWS EC2
- Google Cloud Run
- Docker containers