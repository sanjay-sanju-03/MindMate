# Backend Dockerfile - Node.js + Express
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY server/package.json server/package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY server/ .

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "run", "dev"]
