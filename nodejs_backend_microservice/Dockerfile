# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app/
RUN npm install

# Copy the application code
COPY . /app

# Expose the port and start the app
EXPOSE 5000
CMD ["npm", "start"]