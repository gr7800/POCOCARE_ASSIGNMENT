# Pococare Backend Assignment

A Normal a JWT based authentication and authorization system.


Deployedlinkforbackend : https://pococareauthentication.onrender.com


This is a backend codebase for a simple e-commerce application built with Node.js, Express, and MongoDB. The application provides APIs for User authentication and product management.

* Requirements
* Node.js
* MongoDB Atlas account
* Postman or any REST client tool

Getting Started
To get started with this project, follow the steps below:

1. Clone the repository to your local machine:

git clone https://github.com/<username>/<repository>.git

2. Navigate to the project directory:

cd <repository>

3. Install the dependencies:

npm install

4. Create a .env file in the root directory and provide the following environment variables:

PORT=<port_number>
URL=<mongodb_connection_string>
SECRET_KEY=<secret_key_for_jwt>

5. Start the server:

npm start

6. Open a REST client tool like Postman and test the available endpoints.

* Available Endpoints

* User Authentication
1. POST /user/signup: Create a new user account
2. POST /user/login: Login with email and password
3. GET /user/token: Get new access token with refresh token

* Product Management
1. GET /product/getproduct: Get all products

Note: To access protected routes, you need to include the access token in the Authorization header of the request.