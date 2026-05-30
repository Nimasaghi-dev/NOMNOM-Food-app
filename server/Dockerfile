# Backend API image for the NOMNOM Food app.
# Build from the server/ folder:  docker build -t nomnom-api ./server
FROM node:22-alpine

WORKDIR /app

# Install dependencies first for better layer caching.
# The schema is needed because the postinstall hook runs `prisma generate`.
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

# Copy the rest of the source.
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

# `npm start` runs `prisma migrate deploy` (applies pending migrations to the
# production database) and then starts the Express server.
CMD ["npm", "start"]
