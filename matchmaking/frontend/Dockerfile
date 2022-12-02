FROM node:18.12.1-bullseye-slim as build

WORKDIR /app

# Copy in build artifacts, build project dependencies

COPY matchmaking/frontend/ .
RUN npm i

# Needed for serve to be available within the container
RUN npm install -g serve

RUN npm run build

WORKDIR /app/dist

CMD ["serve", "-p", "7000"]
