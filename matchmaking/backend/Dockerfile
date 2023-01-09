###################################
#              BASE               #
###################################
FROM node:18.12.1-bullseye-slim as base

WORKDIR /app

# Copy files and npm install
COPY matchmaking/backend/. .
RUN npm i

# Provide access to node for adding logs
RUN mkdir -p /.npm && chown -R 1001:0 /.npm && chmod -R ug+rwx /.npm

USER 1001

###################################
#           DEV BUILD             #
###################################
FROM base as dev
ENV NODE_ENV=development

# Nodemon Entrypoint
CMD ["npm", "run", "dev"]

###################################
#           PROD BUILD            #
###################################
FROM base as prod
ENV NODE_ENV=production

# Node Entrypoint
CMD ["npm", "run", "start"]
