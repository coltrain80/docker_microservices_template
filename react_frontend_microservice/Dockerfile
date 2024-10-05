# Stage 1: Build the React application
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package.json /app/
COPY package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . /app

# Build the React application for production
RUN npm run build

# Stage 2: Serve the React build with Nginx
FROM nginx:alpine

# Copy the built React files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the HTTP server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
