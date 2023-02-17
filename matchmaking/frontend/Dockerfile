###################################
#              BASE               #
###################################
FROM node:18.12.1-bullseye-slim as base

# Set the working directory to /app
WORKDIR /app

# Copy the frontend build artifacts into the container
COPY matchmaking/frontend/ .

# Using ARG to retrieve env variables
ARG VITE_BASE_API_URL
ENV VITE_BASE_API_URL=${VITE_BASE_API_URL}

###################################
#           DEV BUILD             #
###################################
FROM base as dev

# Set the NODE_ENV environment variable to "development"
ENV NODE_ENV=development

# Install dependencies with npm
RUN npm i

# Expose port 7000
EXPOSE 7000

# Start the development server
CMD ["npm", "run", "dev"]


###################################
#           PROD BUILD            #
###################################
FROM base as prod

# Set the NODE_ENV environment variable to "production"
ENV NODE_ENV=production

# Install dependencies with npm
RUN npm i

# Install the "serve" package globally
RUN npm install -g serve

# Build the project
RUN npm run build

# Set the working directory to /app/dist
WORKDIR /app/dist

# Start the production server with "serve" using SPA mode, and on port 7000
CMD ["serve", "-s", "-p", "7000"]
