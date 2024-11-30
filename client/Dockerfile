# Use the official Node.js image from the Docker Hub
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker's caching
COPY client/package*.json ./

# Install dependencies for the React app
RUN npm install

# Copy the rest of the application code
COPY client/ .

# Expose the port for React development server
EXPOSE 3000

# Command to start the React app
CMD ["npm", "start"]