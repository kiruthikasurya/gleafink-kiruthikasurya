# Use the official Node.js image from the Docker Hub
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker's caching
COPY server/package*.json ./

# Install the dependencies for the Node.js server
RUN npm install --production

# Copy the rest of the application code
COPY server/ .

# Expose the port your app runs on
EXPOSE 4000

# Command to run the application
CMD ["node", "server.js"]