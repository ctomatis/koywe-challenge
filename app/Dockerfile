# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

RUN npm run build
# Expose the port the app runs on
EXPOSE 3000

CMD ["npm", "run", "start"]
