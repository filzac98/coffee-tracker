# ☕ Coffee Tracker

Coffee Tracker is a full-stack web application for tracking coffee beans and espresso brews.

The application allows users to add and manage coffee beans, record brews with parameters such as dose, yield, brew time and grind size, and keep track of ratings and brewing statistics.

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- NestJS
- TypeScript
- TypeORM

### Database
- PostgreSQL

## Features

- Create, view, edit and delete coffee beans
- Record brews for individual beans
- Track espresso parameters such as:
  - Coffee dose
  - Yield
  - Brew time
  - Grind size
  - Water temperature
- Rate beans and brews
- View brewing statistics
- Dashboard with overall coffee and brewing statistics

## Docker

This project is being containerized as part of the Development Environments course.

The goal is to run the complete application using Docker and Docker Compose, with separate services for:

- Next.js frontend
- NestJS backend
- PostgreSQL database

The services will communicate through a Docker network, while a Docker volume will be used to persist PostgreSQL data.

### Planned architecture

Frontend → Backend → PostgreSQL

All services will be managed using Docker Compose.

## Running the application with Docker

> Docker setup is currently in development.

Once the containerization is complete, this section will contain instructions for building and running the complete application using Docker Compose.

## Project Structure

    coffee-tracker/
    ├── frontend/
    ├── backend/
    ├── docker-compose.yml
    └── README.md

## Development Environments Project

This application is being used for the **Web PBA Autumn 2026 Development Environments Project – Containerizing a Web Application**.

The purpose of the project is to take an existing web application and containerize it using Docker and Docker Compose.
