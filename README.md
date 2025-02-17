# NOMNOM - Online Food Ordering Web Application
---
## 🚀 Project Overview

NOMNOM is a full-stack online food ordering application that allows users to browse menus, place orders, and manage their cart seamlessly. Built with a modern UI design, it is fully responsive across all devices.

## 🛠️ Technologies Used

This project is built using a modern and efficient full-stack web development approach. Below are the key technologies and tools used in the frontend, backend, testing, and development process:

### 🖥️ Frontend (Client)

- React – Component-based library for building user interfaces.

- Context API – State management for global application state.

- CSS – Custom styles for a responsive and visually appealing design.

- Jest – Unit testing framework for React components.

- React Testing Library – Testing utilities for React components.

- Cypress – End-to-end testing framework.

- Webpack – Module bundler for optimizing the build process.

- Babel – JavaScript compiler to ensure compatibility across browsers.

- ESLint – Linting tool to maintain code quality.

- Prettier – Code formatter for consistent style.

### 🧑‍💻 Backend (Server)

- Node.js – JavaScript runtime environment.

- Express.js – Web application framework for building REST APIs.

- MongoDB (Mongoose) – NoSQL database with object data modeling (ODM).

- dotenv – Environment variable management.

- JWT (JSON Web Tokens) – Secure authentication mechanism.

- Custom Middleware – Authentication and request-handling utilities.

- Jest – Unit testing framework for backend logic.

- ESLint – Linting tool to ensure backend code quality.

### 🧪 Testing

- Jest – Comprehensive unit and integration tests for both frontend and backend.

- React Testing Library – Testing React components in a user-centric way.

- Cypress – End-to-end testing for simulating real user interactions.

### ⚙️ DevOps & CI/CD

- Husky – Pre-commit hooks to ensure code quality before pushing changes.

- GitHub Actions – Continuous Integration (CI) for automated testing and deployment.

- Heroku – Cloud platform for deploying and hosting the application (indicated by Procfile).

### 📦 Additional Tools

- Webpack – Bundling and optimizing frontend assets.

- Babel – Transpiling modern JavaScript for browser compatibility.

- ESLint & Prettier – Enforcing consistent coding standards across frontend and backend.

---
### 🧑‍💻 Authors
---
### 📦 Installation & Setup
---
### ✨ Key Features
✅ Browse food items and categories
✅ Add items to cart & place orders
✅ Responsive design – works on mobile, tablet, and desktop
✅ Full CRUD operations (Create, Read, Update, Delete)
✅ REST API for food items and orders
✅ Database storage with MongoDB
✅ Modern and clean UI/UX design

---
### 📸 Screenshots 

---
## Project folder structure
```
│   README.md
│
└───cohort49-project-group-B-develop
    │   .gitignore
    │   .prettierrc.json
    │   cypress.config.js
    │   DEV.md
    │   package-lock.json
    │   package.json
    │   Procfile
    │   README.md
    │
    ├───.github
    │   └───workflows
    │           client-code-style-check.yml
    │           server-code-style-check.yml
    │
    ├───.husky
    │       pre-commit
    │
    ├───.vscode
    │       settings.json
    │
    ├───client
    │   │   .babelrc
    │   │   .env.example
    │   │   .eslintrc.js
    │   │   jest.config.js
    │   │   package-lock.json
    │   │   package.json
    │   │   setupTests.js
    │   │   webpack.config.js
    │   │
    │   ├───public
    │   │       index.html
    │   │
    │   ├───src
    │   │   │   App.jsx
    │   │   │   AppWrapper.jsx
    │   │   │   index.css
    │   │   │   index.jsx
    │   │   │
    │   │   ├───components
    │   │   │   │   AuthHeader.jsx
    │   │   │   │   AvailableRestaurants.jsx
    │   │   │   │   BackBtn.jsx
    │   │   │   │   CartItem.jsx
    │   │   │   │   Filters.jsx
    │   │   │   │   Footer.jsx
    │   │   │   │   Input.jsx
    │   │   │   │   Item.jsx
    │   │   │   │   LoadingSpinner.jsx
    │   │   │   │   LogIn.jsx
    │   │   │   │   LogoutBtn.jsx
    │   │   │   │   MenuList.jsx
    │   │   │   │   Nav.jsx
    │   │   │   │   Nav.testid.js
    │   │   │   │   SearchBar.jsx
    │   │   │   │   SignUp.jsx
    │   │   │   │
    │   │   │   └───__tests__
    │   │   │           Nav.test.js
    │   │   │
    │   │   ├───context
    │   │   │       CartContext.jsx
    │   │   │       SearchContext.jsx
    │   │   │
    │   │   ├───data
    │   │   │       PizzaData.js
    │   │   │
    │   │   ├───hooks
    │   │   │   │   useFetch.js
    │   │   │   │
    │   │   │   └───__tests__
    │   │   │           useFetch.test.js
    │   │   │
    │   │   ├───img
    │   │   │       1.jpg
    │   │   │       10.jpg
    │   │   │       11.jpg
    │   │   │       12.jpg
    │   │   │       13.jpg
    │   │   │       14.jpg
    │   │   │       15.jpg
    │   │   │       16.jpg
    │   │   │       17.jpg
    │   │   │       18.jpg
    │   │   │       19.jpg
    │   │   │       2.jpg
    │   │   │       20.jpg
    │   │   │       21.jpg
    │   │   │       22.jpg
    │   │   │       23.jpg
    │   │   │       24.jpg
    │   │   │       25.jpg
    │   │   │       26.jpg
    │   │   │       27.jpg
    │   │   │       28.jpg
    │   │   │       29.jpg
    │   │   │       3.jpg
    │   │   │       30.jpg
    │   │   │       31.jpg
    │   │   │       32.jpg
    │   │   │       33.jpg
    │   │   │       34.jpg
    │   │   │       35.jpg
    │   │   │       4.jpg
    │   │   │       5.jpg
    │   │   │       6.jpg
    │   │   │       7.jpg
    │   │   │       8.jpg
    │   │   │       9.jpg
    │   │   │       back-icon.png
    │   │   │       Card.svg
    │   │   │       cart.svg
    │   │   │       Desserts.svg
    │   │   │       Drinks.svg
    │   │   │       eye-close.svg
    │   │   │       eye-open.svg
    │   │   │       home.jpg
    │   │   │       logo.png
    │   │   │       Meals.svg
    │   │   │       order-card.svg
    │   │   │       Pizzas.svg
    │   │   │       Starters.svg
    │   │   │       trash-icon.svg
    │   │   │       Vegan.svg
    │   │   │
    │   │   ├───pages
    │   │   │   │   AboutUs.jsx
    │   │   │   │   StartPage.jsx
    │   │   │   │
    │   │   │   ├───Auth
    │   │   │   │       Login.jsx
    │   │   │   │       Signup.jsx
    │   │   │   │
    │   │   │   ├───Checkout
    │   │   │   │       Checkout.jsx
    │   │   │   │
    │   │   │   ├───Home
    │   │   │   │   │   Home.jsx
    │   │   │   │   │   Home.testid.js
    │   │   │   │   │
    │   │   │   │   └───__tests__
    │   │   │   │           Home.test.js
    │   │   │   │
    │   │   │   ├───Menu
    │   │   │   │       Menu.jsx
    │   │   │   │
    │   │   │   ├───OrderCarts
    │   │   │   │       OrderCart.jsx
    │   │   │   │
    │   │   │   ├───OrderTracking
    │   │   │   │       OrderTracking.jsx
    │   │   │   │
    │   │   │   ├───SignIn
    │   │   │   │       SignIn.jsx
    │   │   │   │
    │   │   │   └───User
    │   │   │       │   CreateUser.jsx
    │   │   │       │   CreateUser.testid.js
    │   │   │       │   UserList.jsx
    │   │   │       │   UserList.testid.js
    │   │   │       │
    │   │   │       └───__tests__
    │   │   │               CreateUser.test.js
    │   │   │               UserList.test.js
    │   │   │
    │   │   ├───styles
    │   │   │       about-us.css
    │   │   │       authHeader.css
    │   │   │       checkout.css
    │   │   │       filters.css
    │   │   │       footer.css
    │   │   │       home.css
    │   │   │       LoadingSpinner.css
    │   │   │       login.css
    │   │   │       logout.css
    │   │   │       menu.css
    │   │   │       nav.css
    │   │   │       OrderTracking.css
    │   │   │       signup.css
    │   │   │       startPage.css
    │   │   │
    │   │   ├───util
    │   │   │   │   changeBodyColor.jsx
    │   │   │   │   clearLS.js
    │   │   │   │   createTestIdFilePath.js
    │   │   │   │
    │   │   │   └───__tests__
    │   │   │           createTestIdFilePath.test.js
    │   │   │
    │   │   ├───__tests__
    │   │   │       App.test.js
    │   │   │
    │   │   └───__testUtils__
    │   │           fetchMocks.js
    │   │           fetchUserMocks.js
    │   │
    │   └───__mocks__
    │           fileMock.js
    │           styleMock.js
    │
    ├───cypress
    │   ├───e2e
    │   │   ├───examples
    │   │   │   ├───1-getting-started
    │   │   │   │       todo.spec.example.js
    │   │   │   │
    │   │   │   └───2-advanced-examples
    │   │   │           actions.spec.example.js
    │   │   │           aliasing.spec.example.js
    │   │   │           assertions.spec.example.js
    │   │   │           connectors.spec.example.js
    │   │   │           cookies.spec.example.js
    │   │   │           cypress_api.spec.example.js
    │   │   │           files.spec.example.js
    │   │   │           local_storage.spec.example.js
    │   │   │           location.spec.example.js
    │   │   │           misc.spec.example.js
    │   │   │           navigation.spec.example.js
    │   │   │           network_requests.spec.example.js
    │   │   │           querying.spec.example.js
    │   │   │           spies_stubs_clocks.spec.example.js
    │   │   │           traversal.spec.example.js
    │   │   │           utilities.spec.example.js
    │   │   │           viewport.spec.example.js
    │   │   │           waiting.spec.example.js
    │   │   │           window.spec.example.js
    │   │   │
    │   │   ├───Home
    │   │   │       home.spec.js
    │   │   │
    │   │   ├───Navigation
    │   │   │       navigation.spec.js
    │   │   │
    │   │   └───User
    │   │           createuser.spec.js
    │   │           userlist.spec.js
    │   │
    │   ├───fixtures
    │   │       example.json
    │   │
    │   ├───plugins
    │   │       index.js
    │   │
    │   └───support
    │           commands.js
    │           e2e.js
    │
    └───server
        │   .env.example
        │   .eslintrc.cjs
        │   babel.config.cjs
        │   jest.config.js
        │   package-lock.json
        │   package.json
        │
        └───src
            │   app.js
            │   index.js
            │   testRouter.js
            │
            ├───controllers
            │       auth.js
            │       authController.js
            │       menu.js
            │       restaurants.js
            │       user.js
            │
            ├───data
            │       item.js
            │       order.js
            │       restaurant.js
            │       review.js
            │       user.js
            │
            ├───db
            │       connectDB.js
            │       seedDB.js
            │
            ├───middlewares
            │       AuthMiddleware.js
            │
            ├───models
            │       Item.js
            │       Order.js
            │       Restaurants.js
            │       Reviews.js
            │       User.js
            │
            ├───routes
            │       auth.js
            │       authRoute.js
            │       menu.js
            │       orderRoutes.js
            │       restaurants.js
            │       user.js
            │
            ├───util
            │   │   logging.js
            │   │   SecretToken.js
            │   │   validateAllowedFields.js
            │   │   validationErrorMessage.js
            │   │
            │   └───__tests__
            │           logging.test.js
            │           validateAllowedFields.test.js
            │           validationErrorMessage.test.js
            │
            ├───__tests__
            │       createUser.test.js
            │       user.test.js
            │
            └───__testUtils__
                    dbMock.js
                    userMocks.js 
```