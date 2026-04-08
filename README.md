# NOMNOM — Online Food Ordering App

A full-stack food ordering web application built with the MERN stack. Users can browse restaurant menus, filter by category, add items to a cart, check out with a choice of payment method, and track their order on a live map with a countdown timer.

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://cloud.mongodb.com)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Data Flow](#data-flow)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Authors](#authors)

---

## Demo

> _Add a screenshot or GIF of the running app here._

| Page | Description |
| --- | --- |
| Home | Lists available restaurants with address and Google Maps link |
| Menu | Browse 35 items across Starters, Pizzas, Desserts and Drinks with category filters |
| Cart | Slide-out sidebar with item list, totals, and checkout button |
| Checkout | Delivery address + payment method selector (Cash, Credit Card, PayPal) with live card preview |
| Order Tracking | Animated countdown (random 20–45 min), progress bar, live Google Maps embed |

---

## Features

- **User authentication** — JWT-based signup and login, tokens stored as cookies
- **Restaurant listing** — paginated restaurant cards with phone, address, and Google Maps deep links
- **Menu browsing** — 35 food items across four categories; paginated (6 per page); filter tabs
- **Shopping cart** — global state via React Context; persisted to `localStorage`; badge count on cart icon
- **Add-to-cart feedback** — button changes to "✓ Added!" with a toast notification
- **Checkout flow** — address input, order summary, payment method selection
- **Payment methods** — Cash on Delivery, Credit/Debit Card (with live 3-D flip card preview), PayPal
- **Order tracking** — random estimated delivery time, animated progress bar, Google Maps iframe embed
- **Fully responsive** — mobile-first CSS, tested at 375 px, 768 px, 1024 px, 1440 px

---

## Tech Stack

### Frontend

| Tool | Purpose |
| --- | --- |
| React 19 | UI component library |
| React Router DOM 7 | Client-side routing |
| Webpack 5 + Babel | Bundling and transpilation |
| React Context API | Global cart and search state |
| React Toastify | Toast notifications |
| Custom CSS | Styling (no CSS framework) |

### Backend

| Tool | Purpose |
| --- | --- |
| Node.js + Express 4 | REST API server |
| Mongoose 8 | MongoDB ODM |
| JSON Web Tokens | Stateless authentication |
| bcrypt | Password hashing (12 rounds) |
| cookie-parser | JWT cookie parsing |
| cors | Cross-origin request handling |
| dotenv | Environment variable loading |

### Database

| Tool | Purpose |
| --- | --- |
| MongoDB Atlas | Cloud-hosted NoSQL database |
| 5 collections | users, items, orders, restaurants, reviews |

### Dev and Testing

| Tool | Purpose |
| --- | --- |
| Jest + React Testing Library | Unit and integration tests |
| Cypress | End-to-end tests |
| ESLint + Prettier | Code quality and formatting |
| Husky | Pre-commit hooks |
| GitHub Actions | CI code-style checks |
| concurrently | Run client and server together |

---

## Project Structure

```
NOMNOM-Food-app/
└── cohort49-project-group-B-develop/
    ├── client/                        # React frontend
    │   ├── public/index.html
    │   └── src/
    │       ├── components/            # Reusable UI components
    │       │   ├── AvailableRestaurants.jsx
    │       │   ├── CartItem.jsx
    │       │   ├── Filters.jsx
    │       │   ├── Item.jsx
    │       │   ├── MenuList.jsx
    │       │   ├── Nav.jsx
    │       │   └── ...
    │       ├── context/
    │       │   └── CartContext.jsx    # Global cart state
    │       ├── hooks/
    │       │   └── useFetch.js        # Centralised API hook
    │       ├── pages/
    │       │   ├── Auth/              # Login & Signup
    │       │   ├── Checkout/          # Checkout + payment
    │       │   ├── Home/              # Restaurant listing
    │       │   ├── Menu/              # Menu + filters
    │       │   ├── OrderCarts/        # Cart sidebar
    │       │   ├── OrderTracking/     # Timer + map
    │       │   └── StartPage.jsx
    │       └── styles/                # Per-page CSS files
    │
    ├── server/                        # Express backend
    │   └── src/
    │       ├── controllers/           # Business logic
    │       ├── db/
    │       │   ├── connectDB.js       # MongoDB connection
    │       │   └── seedDB.js          # Database seeding script
    │       ├── middlewares/
    │       │   └── AuthMiddleware.js  # JWT verification
    │       ├── models/                # Mongoose schemas
    │       ├── routes/                # Express route definitions
    │       └── util/                  # Logging, token helpers
    │
    └── cypress/                       # End-to-end tests
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- A free [MongoDB Atlas](https://cloud.mongodb.com) account

### 1 — Clone the repository

```bash
git clone https://github.com/Nimasaghi-dev/NOMNOM-Food-app.git
cd NOMNOM-Food-app/cohort49-project-group-B-develop
```

### 2 — Set up MongoDB Atlas

1. Sign in at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free **M0** cluster
3. Under **Database Access**, create a user with a username and password
4. Under **Network Access**, add your IP (or `0.0.0.0/0` for development)
5. Click **Connect → Drivers** and copy the connection string

### 3 — Configure environment variables

Create `server/.env` based on the example:

```bash
cp server/.env.example server/.env
```

Then open `server/.env` and fill in your values:

```env
PORT=3000
MONGODB_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/nomnom?retryWrites=true&w=majority
TOKEN_KEY=replace_with_a_long_random_secret
SESSION_SECRET=replace_with_another_long_random_secret
CLIENT_URL=http://localhost:8080
NODE_ENV=development
```

Create the client `.env` (the webpack proxy handles routing so `BASE_SERVER_URL` stays empty in development):

```bash
cp client/.env.example client/.env
```

### 4 — Install dependencies

```bash
npm run setup
```

This runs `npm install` inside both `client/` and `server/`.

### 5 — Seed the database

Populate MongoDB with one restaurant and 35 menu items:

```bash
cd server
npm run seed
cd ..
```

### 6 — Start the development servers

```bash
npm run dev
```

This starts both servers concurrently:

| Service | URL |
| --- | --- |
| React frontend | <http://localhost:8080> |
| Express API | <http://localhost:3000> |

> The webpack dev server proxies all `/api` requests to port 3000, so there are no CORS issues in development.

---

## Environment Variables

### Server (`server/.env`)

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | Yes | Port the Express server listens on |
| `MONGODB_URL` | Yes | MongoDB Atlas connection string |
| `TOKEN_KEY` | Yes | Secret used to sign JWT tokens (32+ random characters) |
| `SESSION_SECRET` | Yes | Secret for Express session (used by OAuth flows) |
| `CLIENT_URL` | Yes | Frontend URL allowed by CORS (`http://localhost:8080` in dev) |
| `NODE_ENV` | Yes | `development` locally, `production` on Heroku |
| `GOOGLE_CLIENT_ID` | No | Only needed for Google OAuth login |
| `GOOGLE_CLIENT_SECRET` | No | Only needed for Google OAuth login |

### Client (`client/.env`)

| Variable | Default | Description |
| --- | --- | --- |
| `BASE_SERVER_URL` | `""` | Backend base URL. Leave empty in development (webpack proxy is used). Set to your Heroku URL in production. |

---

## Available Scripts

Run from the root `cohort49-project-group-B-develop/` directory:

| Command | Description |
| --- | --- |
| `npm run dev` | Start client and server concurrently in watch mode |
| `npm run setup` | Install all dependencies (client + server) |
| `npm test` | Run Jest unit tests for client and server |
| `npm run test:cypress` | Run Cypress end-to-end tests (headless) |
| `npm run cypress` | Open Cypress interactive test runner |
| `npm run lint` | ESLint check for client and server |
| `npm run autofix` | Auto-fix ESLint and Prettier issues |
| `npm run code-style-check` | Prettier + ESLint check (used in CI) |
| `npm run build:client` | Production webpack build |

Run from `server/`:

| Command | Description |
| --- | --- |
| `npm run seed` | Clear and re-seed the database |
| `npm run dev` | Start Express with nodemon |
| `npm start` | Start Express for production |

---

## API Reference

All endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint | Body | Description |
| --- | --- | --- | --- |
| `POST` | `/api/signup` | `{ email, username, password }` | Create a new account. Returns JWT cookie. |
| `POST` | `/api/login` | `{ email, password }` | Log in. Returns JWT cookie. |
| `POST` | `/api/` | — | Verify JWT cookie. Returns `{ status, user }`. |

### Menu

| Method | Endpoint | Query Params | Description |
| --- | --- | --- | --- |
| `GET` | `/api/menu` | `page`, `limit` | All menu items (paginated, default 6/page) |
| `GET` | `/api/menu/starters` | `page`, `limit` | Items with category `starter` |
| `GET` | `/api/menu/pizzas` | `page`, `limit` | Items with category `main_dish` |
| `GET` | `/api/menu/desserts` | `page`, `limit` | Items with category `desserts` |
| `GET` | `/api/menu/drinks` | `page`, `limit` | Items with category `drinks` |

All menu responses: `{ success: true, result: [...], totalPages, currentPage }`

### Restaurants

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/restaurants` | List all restaurants |

Response: `{ success: true, result: [...] }`

### Orders

| Method | Endpoint | Body | Description |
| --- | --- | --- | --- |
| `GET` | `/api/order` | — | List all orders |
| `POST` | `/api/order` | `{ items, total_amount, address, paymentMethod }` | Create a new order |
| `PUT` | `/api/order/:id` | Partial order fields | Update an order |
| `DELETE` | `/api/order/:id` | — | Delete an order |

`POST` response: `{ success: true, result: <order> }`

---

## Data Flow

```
Browser (React, :8080)
│
│  User fills form → performFetch("/signup")
│  URL: http://localhost:8080/api/signup
│           │
│           │  webpack devServer proxy forwards to :3000
│           ▼
Express (:3000)
│  POST /api/signup
│  → authController.Signup()
│    → User.findOne({ email })        ← MongoDB: users
│    → bcrypt.hash(password, 12)
│    → User.create({ email, username, password })
│    → createSecretToken(user._id)    ← signs JWT with TOKEN_KEY
│    → res.cookie("token", jwt)
│    → res.json({ success: true, user })
│           │
│           ▼
React
  useFetch sees success: true → onSuccess() → navigate("/home")
```

**Complete ordering flow:**

```
Browse Restaurants → Click "Check the menu"
  → Menu page fetches GET /api/menu
  → User clicks "Add to cart"
    → CartContext.addToCart(item)
    → localStorage updated
    → Cart badge increments
  → User opens cart sidebar
  → User clicks "Checkout" → /checkout
  → User enters address + selects payment method
  → User clicks "Place Order"
    → POST /api/order { items, total_amount, address, paymentMethod }
    → Order.create() saved to MongoDB
    → { success: true } returned
    → address saved to localStorage("deliveryAddress")
    → navigate("/order-tracking")
  → OrderTracking reads address, shows Google Maps embed
  → Random 20–45 min countdown timer starts
```

---

## Database Schema

### `users`

```js
{
  email:      String  (required, unique, lowercase),
  username:   String  (required, unique),
  password:   String  (required, bcrypt-hashed),
  orders:     [String],
  reviews:    Number,
  created_at: String,
  updated_at: String
}
```

### `items` (menu)

```js
{
  Restaurants_id: ObjectId -> restaurants,
  food_name:      String,
  description:    String,
  price:          Number,
  category:       "starter" | "main_dish" | "desserts" | "drinks",
  reviews:        [ObjectId -> reviews],
  imgId:          Number  (1-35, maps to /img/{n}.jpg)
}
```

### `orders`

```js
{
  restaurant_id:  ObjectId -> restaurants  (optional),
  total_amount:   Number,
  status:         "pending" | "on the way" | "completed" | "delivered"  (default: "pending"),
  items: [{
    id:       ObjectId,
    name:     String,
    price:    Number,
    quantity: Number,
    imgId:    Number
  }],
  address:        String,
  paymentMethod:  String  (default: "Cash")
}
```

### `restaurants`

```js
{
  name:    String,
  address: String,
  phone:   String,
  email:   String (unique),
  cuisine: String
}
```

### `reviews`

```js
{
  restaurant_id: ObjectId -> restaurants,
  rating:        Number (1-5),
  comment:       String
}
```

---

## Testing

### Unit tests (Jest + React Testing Library)

```bash
# Run all tests
npm test

# Watch mode
cd client && npm run test:watch
cd server && npm run test:watch

# Coverage report
cd client && npm run test:coverage
cd server && npm run test:coverage
```

### End-to-end tests (Cypress)

Cypress uses a **separate database** to avoid touching real data. Before running E2E tests, point `MONGODB_URL` in `server/.env` to a database named `cypressDatabase`:

```env
MONGODB_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/cypressDatabase?...
```

```bash
# Headless run (CI)
npm run test:cypress

# Interactive runner
npm run cypress
```

---

## Deployment

The project is configured for **Heroku** deployment via the included `Procfile`.

### Steps

1. Create a Heroku app and link your GitHub repository
2. Set all [environment variables](#environment-variables) in **Heroku → Settings → Config Vars**
3. Set `NODE_ENV=production` and `BASE_SERVER_URL` to your Heroku app URL
4. Push to `main` — Heroku runs `heroku-postbuild` which installs dependencies and builds the React bundle
5. The Express server serves the built React app as static files in production

```
Procfile:  web: npm run start
```

---

## Authors

**Nima Saghi** — [GitHub](https://github.com/Nimasaghi-dev)

---

## License

This project is licensed under the **ISC License**.
