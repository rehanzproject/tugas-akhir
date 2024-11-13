# Use Node.js official image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Set environment variables
ENV DB_USERNAME=root
ENV DB_PASSWORD=example
ENV DB_DBNAME=app_db
ENV DB_PORT=3306
ENV DB_HOST=my_db

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Expose port 3000 for the backend app
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
