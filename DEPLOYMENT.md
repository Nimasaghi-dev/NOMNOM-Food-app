# NOMNOM — Database & Deployment Guide

The app now uses **PostgreSQL** via **Prisma** (previously MongoDB/Mongoose).

## Local development

You need Docker Desktop running.

```bash
# 1. Start a local PostgreSQL container (defined in docker-compose.yml)
docker compose up -d

# 2. Apply the database schema (first time, or after editing prisma/schema.prisma)
cd server
npm install
npm run prisma:migrate      # creates/updates tables + Prisma client

# 3. Run the app (from the project root)
cd ..
npm run dev                 # starts server (:3000) + client (:8080)
```

- The server auto-seeds the demo restaurant + menu when the database is empty.
- To reseed manually: `cd server && npm run seed`.
- Local Postgres listens on host port **5433** (5432 was already taken on this machine). Connection string lives in `server/.env` as `DATABASE_URL`.
- Inspect the data visually with `cd server && npm run prisma:studio`.

## Production

The client (Netlify) and the API/database must be hosted separately.

### 1. Provision a managed PostgreSQL
Create a free Postgres on **Neon**, **Railway**, **Render**, or **Supabase** and copy its connection string (it looks like `postgresql://user:pass@host/db?sslmode=require`).

### 2. Deploy the backend (`server/`)
A `server/Dockerfile` is included; deploy it to any container host (Render, Railway, Fly.io, etc.). Set these environment variables on the host:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | your managed Postgres connection string |
| `TOKEN_KEY` | a long random secret (32+ chars) |
| `SESSION_SECRET` | another long random secret |
| `CLIENT_URL` | your Netlify site URL, e.g. `https://your-site.netlify.app` |
| `NODE_ENV` | `production` |
| `PORT` | provided by the host, or `3000` |

The container's start command runs `prisma migrate deploy` automatically, so the
schema is applied to the production database on every deploy. Seed it once with
`npm run seed` (run against the production `DATABASE_URL`) if you want demo data.

### 3. Point the frontend at the backend
In **Netlify → Site settings → Environment variables**, set:

```
BASE_SERVER_URL=https://your-backend-host.example.com
```

Then trigger a redeploy — this value is compiled into the bundle at build time,
so it only takes effect after a rebuild.

### Cross-domain cookies
Because the frontend and backend are on different domains in production, the auth
cookie is set with `SameSite=None; Secure` when `NODE_ENV=production` (handled in
`server/src/controllers/authController.js`). This is required or the browser will
drop the login cookie.
