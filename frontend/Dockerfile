FROM node:16-bullseye-slim AS base

# Change permissions to non-root user
#RUN mkdir /app && chown -R node:node /app

# Create app directory
WORKDIR /app
RUN chown -R node:node /app
USER node

# Copy files from frontend to working directory, excluding node_modules
COPY --chown=node:node frontend/. .

# Copy env file to working directory
ARG env
COPY --chown=node:node $env .env

EXPOSE 8080

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
ENV NODE_ENV=production

# Install dependencies
RUN npm i --omit=dev && npm cache clean --force
# Install serve for serving the production build
RUN npm i serve@14.0.1

# Build and serve prod
CMD ["npm", "run", "prod"]
