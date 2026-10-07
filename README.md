# Coffee Tracker

Coffee Tracker is a full-stack web application for tracking coffee beans and espresso brews. Users can manage beans and brews and view statistics through a dashboard.

The application consists of three services:

- **Frontend:** Next.js
- **Backend:** NestJS REST API
- **Database:** PostgreSQL

For the Development Environments project, the application has been containerized using Docker and Docker Compose. The complete application can be started as a multi-container environment with persistent database storage and an isolated Docker network.

---

## Docker Architecture

The Docker environment consists of three services:

| Service | Technology | Host Port | Container Port |
| --- | --- | --- | --- |
| `frontend` | Next.js | 3001 | 3000 |
| `backend` | NestJS | 3000 | 3000 |
| `db` | PostgreSQL 17 | Not exposed | 5432 |

The services communicate through the named Docker network `coffee-network`.

The frontend communicates with the backend internally using:

```text
http://backend:3000
```

The backend connects to PostgreSQL using:

```text
db:5432
```

The PostgreSQL port is not published to the host because only the backend needs direct access to the database.

PostgreSQL data is stored in the named volume `postgres_data`, allowing database data to persist when containers are stopped or recreated.

The architecture can be represented as:

```text
Browser
   |
   | localhost:3001
   v
Frontend
Next.js :3000
   |
   | http://backend:3000
   v
Backend
NestJS :3000
   |
   | db:5432
   v
PostgreSQL :5432
   |
   v
postgres_data
```

---

## Prerequisites

To run the application, you need:

- Docker
- Docker Compose

No local installation of Node.js or PostgreSQL is required when running the application through Docker.

---

## Environment Setup

The Docker environment uses environment variables for the PostgreSQL configuration.

An example configuration is included in `.env.example`.

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

The default development configuration is:

```env
POSTGRES_USER=coffee_user
POSTGRES_PASSWORD=coffee_password
POSTGRES_DB=coffee_tracker
```

The `.env` file is ignored by Git and should not be committed.

---

## Running the Application

Build the images and start all services:

```bash
docker compose up --build -d
```

Check that the containers are running:

```bash
docker compose ps
```

The application is then available at:

- Frontend: `http://localhost:3001`
- Backend API: `http://localhost:3000`

To stop and remove the containers and Docker network:

```bash
docker compose down
```

The PostgreSQL data is stored in a named Docker volume and is therefore not removed by `docker compose down`.

To start the application again without rebuilding unchanged images:

```bash
docker compose up -d
```

---

## Docker Configuration

Docker Compose manages the three services defined in `docker-compose.yml`:

- `frontend`
- `backend`
- `db`

The frontend and backend images are built from Dockerfiles located in their respective directories.

Both application images use multi-stage builds to separate the build environment from the final runtime environment.

---

## Backend Docker Image

The NestJS backend uses a multi-stage Docker build.

### Builder Stage

The builder stage:

1. Uses `node:22-alpine`
2. Installs all dependencies with `npm ci`
3. Copies the application source
4. Compiles the NestJS application with `npm run build`

### Runner Stage

The final runner stage:

1. Uses a fresh `node:22-alpine` image
2. Installs only production dependencies using:

```bash
npm ci --omit=dev
```

3. Copies only the compiled `dist` directory from the builder
4. Runs the application as the built-in non-root `node` user
5. Starts the application using:

```text
node dist/main.js
```

This keeps development dependencies and the TypeScript source out of the final runtime image.

---

## Frontend Docker Image

The Next.js frontend also uses a multi-stage Docker build.

Next.js is configured with:

```ts
output: "standalone"
```

During the build, Next.js generates a standalone production server containing the dependencies required to run the application.

The final runner image only receives:

- The standalone Next.js server
- Required runtime dependencies
- Next.js static assets
- Files from the `public` directory

The application is started using:

```text
node server.js
```

The frontend also runs as the non-root `node` user.

---

## Image Optimization

The original frontend and backend Dockerfiles used single-stage builds. This meant that build tools, development dependencies and other files remained in the final images.

After introducing multi-stage builds and Next.js standalone output, the image sizes were reduced:

| Image | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Backend | 727 MB | 422 MB | ~42% |
| Frontend | 1.42 GB | 329 MB | ~77% |

The image sizes can be inspected using:

```bash
docker image ls | grep coffee-tracker
```

---

## Non-Root Containers

Both application containers run as the built-in `node` user instead of root.

This can be verified using:

```bash
docker compose exec backend whoami
docker compose exec frontend whoami
```

Expected output:

```text
node
node
```

Running the application processes as a non-root user limits their privileges inside the containers.

This refers to non-root application execution inside the containers and should not be confused with running the Docker daemon itself in rootless mode.

---

## Networking

All three services are connected to the named Docker network:

```text
coffee-network
```

Docker Compose provides internal DNS resolution, allowing containers to communicate using service names rather than IP addresses.

For example, the backend connects to PostgreSQL using:

```text
db:5432
```

instead of a container IP address.

The frontend's server-side code communicates with the backend using:

```text
http://backend:3000
```

The network can be inspected using:

```bash
docker network inspect coffee-network
```

The database does not publish port `5432` to the host because database access is only required from the backend container.

---

## Database Persistence

PostgreSQL stores its data in the named Docker volume:

```text
postgres_data
```

The volume is mounted at PostgreSQL's data directory inside the database container.

This means the database container can be removed and recreated without deleting the application data.

Persistence can be tested with:

```bash
docker compose down
docker volume ls
docker compose up -d
```

After recreating the containers, existing data can still be retrieved from the backend:

```bash
curl http://localhost:3000/beans
```

Do not use:

```bash
docker compose down -v
```

when the database data should be retained, because the `-v` option also removes the named volume.

---

## Database Health Check

The PostgreSQL service has a Docker health check using `pg_isready`.

Docker checks whether PostgreSQL is ready to accept connections every five seconds.

The backend depends on the database using:

```yaml
depends_on:
  db:
    condition: service_healthy
```

This means the backend does not start simply because the database container is running. It waits until PostgreSQL reports that it is healthy and ready to accept connections.

The health status can be checked with:

```bash
docker compose ps
```

A healthy database will appear as:

```text
Up (healthy)
```

---

## Environment Variables

Database configuration is stored in the root `.env` file.

Docker Compose reads these values and supplies them to both PostgreSQL and the backend.

For example:

```text
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
```

are used to configure PostgreSQL and are mapped to the corresponding backend database configuration.

The real `.env` file is excluded from Git, while `.env.example` documents the variables required to run the project.

The fully resolved Compose configuration can be inspected with:

```bash
docker compose config
```

Note that this command may display resolved environment values, including passwords, in the terminal.

---

## Testing

The containerized environment was tested at several levels.

### Service Status

```bash
docker compose ps
```

This verifies that the frontend, backend and database containers are running and that PostgreSQL is healthy.

### Backend API

The backend can be tested directly using:

```bash
curl http://localhost:3000/beans
```

### Database Persistence

A test bean was created through the API.

The containers were then removed using:

```bash
docker compose down
```

After recreating the environment:

```bash
docker compose up -d
```

the bean was still available, confirming that PostgreSQL data persisted in the named volume.

### Non-Root Execution

The runtime users were checked using:

```bash
docker compose exec backend whoami
docker compose exec frontend whoami
```

Both returned:

```text
node
```

### Compose Configuration

The final resolved Docker Compose configuration was checked using:

```bash
docker compose config
```

### Logs

Service logs can be inspected using:

```bash
docker compose logs
```

or for a specific service:

```bash
docker compose logs db
docker compose logs backend
docker compose logs frontend
```

---

## Resource Usage

Runtime resource usage can be inspected using:

```bash
docker stats --no-stream
```

During an idle test, the containers used approximately:

| Service | Memory Usage | CPU |
| --- | ---: | ---: |
| Frontend | 31.46 MiB | ~0% |
| Backend | 39.56 MiB | ~0% |
| PostgreSQL | 21.89 MiB | ~0% |

The complete stack therefore used approximately 93 MiB of memory while idle.

These values represent a local idle snapshot and are not intended as measurements of performance under production load.

---

## Project Structure

```text
coffee-tracker/
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── ...
│
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── ...
│
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

The local `.env` files are ignored by Git and are therefore not included in the repository.

---

## Useful Docker Commands

Build and start the application:

```bash
docker compose up --build -d
```

Start using existing images:

```bash
docker compose up -d
```

Check service status:

```bash
docker compose ps
```

Stop the application:

```bash
docker compose down
```

View logs:

```bash
docker compose logs
```

Inspect the Docker network:

```bash
docker network inspect coffee-network
```

List Docker volumes:

```bash
docker volume ls
```

Inspect resource usage:

```bash
docker stats --no-stream
```

Verify the runtime user:

```bash
docker compose exec backend whoami
docker compose exec frontend whoami
```

Validate and inspect the resolved Compose configuration:

```bash
docker compose config
```

---

## Limitations and Further Improvements

The current setup is intended for local development and demonstration rather than production deployment.

Possible future improvements include:

- Adding application-level health checks for the backend and frontend
- Using a dedicated secrets management solution for production credentials
- Adding resource limits for containers
- Adding automated container tests to a CI/CD pipeline
- Deploying the containerized application to a remote server

---

## Development Environments Project

This project demonstrates how an existing full-stack application can be containerized and managed as a reproducible multi-container environment using Docker and Docker Compose.

The setup demonstrates:

- Containerization of frontend and backend applications
- Multi-stage Docker builds
- Non-root application execution
- PostgreSQL in Docker
- Persistent storage using a named volume
- Container networking using a named network
- Service readiness using a database health check
- Environment-based configuration
- Image optimization
- Runtime resource inspection