FROM node:18.9-alpine AS base
#FROM node:16-bullseye-slim

# Change permissions to non-root user
#RUN mkdir /app && chown -R node:node /app

# Create app directory
WORKDIR /app
#RUN chown -R node:node /app
#USER node

# Copy files from frontend to working directory, excluding node_modules
#COPY --chown=node:node frontend/. .
COPY frontend/. .

# Copy env file to working directory
ARG env
#COPY --chown=node:node $env .env
#RUN npm cache clean --force
COPY $env .env

EXPOSE 8080

###################################################
#                   DEV STAGE                     #
###################################################
FROM base AS dev
ENV NODE_ENV=development

ENV PATH=/app/node_modules/.bin:$PATH

# Install dependencies
RUN npm i
RUN npm cache clean --force

# Run dev
CMD ["npm", "run", "dev"]

###################################################
#                   PROD STAGE                    #
###################################################
FROM base AS prod
ENV NODE_ENV=production

# Install dependencies
RUN npm i --omit=dev
RUN npm cache clean --force
# Install serve for serving the production build
RUN npm i serve@14.0.1
#RUN sudo chown -R 1013750000:0 "/.npm"

# Build and serve prod
CMD ["npm", "run", "prod"]
