#API DB Server Workshops On Demand

This is a Workshops-on-Demand registration portal application. It provides an open API 3.0 based api used to manage the Workshops-on-Demand project. it also provides a Database hosting the different status of participants, workshops, students. 

### Getting Started
To run the backend server API, follow the steps below:

## Prerequisites
You need to have node.js and a package manager; both npm (npm is installed with node.js) and yarn package manager.

- [Node Download Page](https://nodejs.org/en/download/) - The latest LTS version will have node.js, npm, and npx.   
- [Yarn Package Manager](https://yarnpkg.com/en/docs/getting-started) - Required.  

1. Install NPM modules

  ```
  $ npm install or yarn install
  ```

2. Configure environment 

  - Server:
  - create a .env file using .env_example file
  ```
    $ cd server

    FROM_EMAIL_ADDRESS='' //hackshack email address to send email to registered customers
    SENDGRID_API_KEY="" //sendgrid api key to send emails
    PORT=               // run the backed server at port
    DB_PW=              // postgreSQL db password - you can set as you wish
    JUPYTER_EMAIL=''    // email of JupyterHub server to prepare notebooks
    FEEDBACK_URL=       // survey link
    POSTFIX_EMAIL=  // email of robot user to send email to
    POSTFIX_PORT=  // Port of Postfix server to send email
    FEEDBACK_URL= // Feedback URL 
    PRODUCTION_API_SERVER= // Production API Server hostname to access swagger doc 
    DENYLIST=example1.org,example2.org // mandatory list for the time being to blacklist these issuers
  ```
2. Run the PostgreSQL database using docker compose

  ```
  $ docker compose up
  ```

3. In a new terminal run the api-db server:
  ```
  $ npm start
  ```

4. Seed the database

  ```
  $ cd server
  $ npm run seed-data
  ```
5. Reset the database

  ```
  $ cd server
  $ npm run reset-data
  ```
