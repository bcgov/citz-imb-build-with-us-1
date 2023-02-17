# Base image
FROM node:18.9-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY build-with-us/backend/package.json .

# Install app dependencies
RUN npm install

# Bundle app source
COPY build-with-us/backend/. .

# Creates a "dist" folder with the production build
RUN npm run build

WORKDIR /app/dist

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
