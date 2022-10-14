FROM node:16-bullseye-slim AS base
ENV NODE_ENV=production

# Required for running nest in dev stage
RUN apt-get update && apt-get install -y procps

# Change permissions to non-root user
RUN mkdir /app && chown -R node:node /app

# Create app directory
WORKDIR /app
USER node

COPY --chown=node:node backend/package*.json ./

# Install dependencies
RUN npm i --only=production && npm cache clean --force

# Copy files from api to working directory
COPY --chown=node:node backend/. .

# Copy env file to working directory
ARG env
COPY --chown=node:node $env .env

# Run nest
CMD ["npm", "run", "start"]

###################################################
#                   DEV STAGE                     #
###################################################
FROM base AS dev
ENV NODE_ENV=development

ENV PATH=/app/node_modules/.bin:$PATH

# Install dependencies
RUN npm i

# Run hot loading nest
CMD ["npm", "run", "start:dev"]

###################################################
#                   PROD STAGE                    #
###################################################
# Fallback in case first build stage is skipped
FROM base AS prod

# Run node directly
CMD ["npm", "run", "start"]