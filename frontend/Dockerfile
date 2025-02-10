# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Build the Vue.js application
RUN npm run build

# Use nginx to serve the built files
FROM nginx:alpine

# Copy built files to nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
