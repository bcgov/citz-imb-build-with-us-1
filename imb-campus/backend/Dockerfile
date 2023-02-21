###################################
#              BASE               #
###################################
FROM node:18.12.1-bullseye-slim as base

WORKDIR /app

# Copy files
COPY imb-campus/backend/. .

# Provide access to node for adding logs
RUN mkdir -p /.npm && chown -R 1001:0 /.npm && chmod -R ug+rwx /.npm

###################################
#           DEV BUILD             #
###################################
FROM base as dev
ENV NODE_ENV=development

# Npm install
RUN npm i

USER 1001

# Nodemon Entrypoint
CMD ["npm", "run", "dev"]

###################################
#           PROD BUILD            #
###################################
FROM base as prod
ENV NODE_ENV=production

# Npm install. Omits dev dependencies when NODE_ENV=production
RUN npm i

USER 1001

# Node Entrypoint
CMD ["npm", "run", "start"]
