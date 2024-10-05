# docker_microservices_template
A repository to help someone get started with a Docker Compose orchestrated code base. This repository demonstrates a generic web stack using:

- **PostgreSQL** for stateful data storage.
- **Node.js** for backend API logic.
- **React** for the front-end user interface.

The stack is containerized and orchestrated using Docker Compose, making it easy to deploy and manage all components together.

### Setup Instructions

#### 1. Setting up the React Frontend Microservice
Run the following command to set up the React application in `react_frontend_microservice`:
```sh
npx create-react-app react_frontend_microservice
```

#### 2. Setting up the PostgreSQL Microservice
- Create the `postgres_microservice` directory with the following structure:
  ```
  postgres_microservice/
  ├── Dockerfile
  └── init_scripts/
      └── init.sql
  ```
- Add the `Dockerfile` and the initialization script (`init.sql`) as outlined above. The initialization script will create required tables in the PostgreSQL database.

#### 3. Setting up the Node.js Backend Microservice
- Create the `backend_nodejs_microservice` directory with the following structure:
  ```
  backend_nodejs_microservice/
  ├── Dockerfile
  ├── app/
  ├── package.json
  ├── seed_data/
  └── tests/
  ```
- Add the `Dockerfile` and `package.json` as outlined above.
- To set up the Node.js application, run the following commands from within the `backend_nodejs_microservice` directory:
  ```sh
  npm init -y
  npm install express pg
  ```
- Create an entry point file (`index.js`) inside the `app` directory to define the backend logic.
