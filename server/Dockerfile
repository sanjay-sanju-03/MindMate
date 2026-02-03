# Backend Dockerfile - Node.js + Express
# This Dockerfile is for local development
# Back4App uses the root Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "run", "dev"]

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "run", "dev"]
