# Library
Application that enables the user to add, list, edit and delete books.

## Front-end:
- The front-end should be built using React Typescript and Material UI.
- The user should be able to add books by providing the title, author, and ISBN.
- The user should be able to list all books or filter the list by title, author, or ISBN.
- The user should be able to edit or delete existing books.
- The user should be able to paginate the list of books.


## Back-end:
- The back-end should be built using Node.js and Express using Typescript.
- The back-end should have a REST API that allows the user to add, list, and filter books.
- The back-end should use any Relational database technology (example: SQLserver, SQLite..) and design to store the books and their data.
- The back-end should be able to handle common success and error cases.

## How to run the application
### Prerequisites
Before you begin, ensure you have the following installed:

Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/en).

### Installation and running application
Follow these steps to get the application up and running.

- Clone this repository:

  `git clone https://github.com/wycliffkas/library.git`

- Change to server directory by running `cd server`
- Create a .env file and add a path to your sqlite database `DB_PATH=/path/to/your/database.db`
- Run `npm install` if you use npm or `yarn` if you use yarn inorder to install the dependencies
- Run `yarn start` to launch the server.
- Change to client directory by running `cd client`
- Run `npm install` if you use npm or `yarn` if you use yarn inorder to install the dependencies
- Create a .env file add add base url for the backend `REACT_APP_BASE_URL=http://localhost:4000`
- Run `yarn start` to launch the frontend app, which will automatically launch the app in the browser.

## Available Scripts

In the client and server project directory, you can run:

#### `yarn start`

Runs the app in the development mode.

#### `yarn test`

Launches the test runner in the interactive watch mode.

#### `yarn build`

Builds the frontend app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.


## Swagger Documentation
The backend API is documented using Swagger. To access the Swagger UI:
- Ensure the backend API is running.
- Open your web browser and navigate to `http://localhost:4000/api-docs/`

You will be presented with a user-friendly interface to explore and test the API endpoints.

## Storybook Documentation
The frontend components are documented using Storybook. To run Storybook:
- Change to client directory
- Run `yarn storybook`

You will be able to interactively view and test individual React components in different states and scenarios.