# Backend Dockerfile - Node.js + Express
# Build context: ./server (from Back4App root directory setting)
FROM node:18-alpine

WORKDIR /app

# Copy package files (relative to server/ directory)
COPY package.json ./

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
