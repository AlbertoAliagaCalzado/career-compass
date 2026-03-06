# Career Compass API & Frontend

Welcome to the **Career Compass** project. This repository contains a full-stack application orchestrated with Docker, featuring a MySQL database, a FastAPI backend, and a React + Vite frontend.



## 🚀 Prerequisites

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
* Git

## 🛠 Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd career-compass
```

### 2. Start the services
Run the following command from the root directory. Docker will build the images, install dependencies, and start the services:

```bash
docker-compose up --build
```

### 3. Access the Application
Once the containers are healthy and running:
* **Frontend:** http://localhost:3000
* **API Documentation (FastAPI):** http://localhost:8000/docs

## 🏗 Technology Stack & Architecture

### Frontend
The frontend is built with **React** and **Vite**, focusing on a component-based architecture to ensure reusability and maintainability.

* **Component-Based UI:** The interface is broken down into small, reusable units (e.g., StatCard, EvaluationRow, ProgressBar) to keep the code DRY.
* **State Management:** Uses **React Query** for efficient server-state synchronization and **React Context API** to manage global filters.
* **Styling:** Utilizes **Tailwind CSS** for responsive design.

### Backend
The backend is powered by **FastAPI**, structured to separate concerns and ensure scalability using a Controller-Service pattern.

* **Controller Layer (Routers):** Handles HTTP request validation and routing.
* **Service Layer:** Houses the core business logic and database orchestration.
* **Database Layer:** Uses **SQLAlchemy ORM** to interface with MySQL.

## 🔧 Useful Commands

| Task | Command |
| :--- | :--- |
| Start everything | `docker-compose up` |
| Stop services | `docker-compose down` |
| Force rebuild | `docker-compose up --build --force-recreate` |
| View backend logs | `docker logs -f career_compass_api` |