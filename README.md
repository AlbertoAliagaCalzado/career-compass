# Career Compass API & Frontend

Welcome to the **Career Compass** project. This repository contains a full-stack application orchestrated with Docker, featuring a MySQL database, a FastAPI backend, and a React + Vite frontend.



## 🚀 Prerequisites

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
* Git

## 🛠 Setup & Installation

### 1. Clone the repository
\`\`\`bash
git clone <your-repo-url>
cd career-compass
\`\`\`

### 2. Prepare the environment
Ensure you have a \`.dockerignore\` file in the root directory to prevent permission and synchronization issues:
\`\`\`text
db_data
node_modules
.git
.env
__pycache__
*.pyc
\`\`\`

### 3. Start the services
Run the following command from the root directory. Docker will build the images, install dependencies, and start the services:

\`\`\`bash
docker-compose up --build
\`\`\`

### 4. Access the Application
Once the containers are healthy and running:
* **Frontend:** http://localhost:3000
* **API Documentation (FastAPI):** http://localhost:8000/docs

## 🐳 Architecture Overview



* **db (MySQL 8.0):** Stores all user, competency, and specialty data.
* **backend (FastAPI):** Handles business logic, data processing, and database interactions.
* **frontend (React + Vite):** Modern UI for tracking professional development.

## 🔧 Useful Commands

| Task | Command |
| :--- | :--- |
| Start everything | \`docker-compose up\` |
| Stop services | \`docker-compose down\` |
| Force rebuild | \`docker-compose up --build --force-recreate\` |
| View backend logs | \`docker logs -f career_compass_api\` |