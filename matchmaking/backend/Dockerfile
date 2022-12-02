FROM node:18.12.1-bullseye-slim as node18

WORKDIR /app

# Copy files and npm install
COPY matchmaking/backend/. .
RUN npm i

# Entrypoint
CMD ["npm", "run", "start"]
