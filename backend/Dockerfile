# Use the official Node.js image as the base image
FROM node:20.10.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Set the command to run your app
CMD ["node", "dist/app.js"]