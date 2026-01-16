# 1. Use an official Node.js runtime as the base image
# "alpine" is a very small, lightweight version of Linux
FROM node:18-alpine

# 2. Set the working directory inside the container
# All future commands will happen inside this folder
WORKDIR /app

# 3. Copy package.json and package-lock.json first
# We do this specifically to take advantage of Docker caching
COPY package*.json ./

# 4. Install dependencies inside the container
RUN npm install

# 5. Copy the rest of your source code
COPY . .

# 6. Expose the port your app runs on
# (Replace 5000 with your actual backend port)
EXPOSE 5000

# 7. Define the command to run your app
CMD ["npm", "start"]