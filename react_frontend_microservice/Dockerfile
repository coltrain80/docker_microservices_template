# Stage 1: Build the React app
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

# Copy the rest of the application code
COPY . /app

# Build the React app
RUN npm run build

# Stage 2: Serve the React build with Nginx
FROM nginx:alpine

# Copy the build output from Stage 1 to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
