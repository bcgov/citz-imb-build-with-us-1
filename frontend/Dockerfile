FROM node:16-bullseye-slim AS base
ENV NODE_ENV=production

# Change permissions to non-root user
RUN mkdir /app && chown -R node:node /app

# Create app directory
WORKDIR /app
USER node

COPY --chown=node:node frontend/package*.json ./

# Install dependencies
RUN npm i --only=production && npm cache clean --force
RUN npm install webpack
RUN npm install webpack-cli

# Copy files from frontend to working directory
COPY --chown=node:node frontend/. .

# Copy env file to working directory
ARG env
COPY --chown=node:node $env .env

###################################################
#                   DEV STAGE                     #
###################################################
FROM base AS dev
ENV NODE_ENV=development

ENV PATH=/app/node_modules/.bin:$PATH

# Install dependencies
RUN npm i

# Run dev
CMD ["npm", "run", "dev"]

###################################################
#                   PROD STAGE                    #
###################################################
FROM base AS prod

# Build and serve prod
CMD ["npm", "run", "prod"]
