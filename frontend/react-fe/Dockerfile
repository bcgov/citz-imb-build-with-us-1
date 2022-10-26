FROM node:18.9-alpine as build

WORKDIR /app

# Copy in build artifacts, build project dependencies

COPY frontend/react-fe/package*.json ./

RUN npm install

# Needed for serve to be available within the container
RUN npm install -g serve

COPY frontend/react-fe/. .

RUN npm run build

WORKDIR /app/dist

CMD ["serve", "-p", "8080"]
