FROM node:16-bullseye-slim AS base

# Required for running nest in dev stage
RUN apt-get update && apt-get install -y procps

# Change permissions to non-root user
RUN mkdir /app && chown -R node:node /app

# Create app directory
WORKDIR /app
USER node

# Copy files from api to working directory
COPY --chown=node:node backend/. .

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

# Run hot loading nest
CMD ["npm", "run", "start:dev"]

###################################################
#                   PROD STAGE                    #
###################################################
FROM base AS prod
ENV NODE_ENV=production

# Install dependencies
RUN npm i --omit=dev && npm cache clean --force

# Run node directly
