###############################################################################
###                             Pre-Build                                   ###
###############################################################################

FROM node:17.5.0-alpine3.14 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

###############################################################################
###                             Build                                       ###
###############################################################################

FROM node:17.5.0-alpine3.14

ARG NODE_ENV=Production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

COPY --from=build /app/dist ./dist

CMD ["npm", "run", "start"]
