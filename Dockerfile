# 1. Use a lightweight Node.js base image
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first to leverage Docker's caching mechanism
COPY package*.json ./

# 4. Install only production dependencies
RUN npm ci --only=production

# 5. Copy everything else from your root directory into the container
COPY . .

# 6. Expose the port your Node.js application listens on
EXPOSE 3000

# 7. Start the application
CMD ["npm", "start"]
