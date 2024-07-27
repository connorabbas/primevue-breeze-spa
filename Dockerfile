# Use the node:20-alpine image as the base image
FROM node:20-alpine

# Install Git
RUN apk add --no-cache git

# Set the working directory
WORKDIR /srv/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 8000
EXPOSE 8000

# Set the default command
CMD ["sh"]
