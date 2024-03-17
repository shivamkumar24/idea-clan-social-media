# Social Media API

This is a backend server application for a basic social media platform built with Node.js, Express, MongoDB, and GraphQL.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Setup](#setup)
4. [Endpoints](#endpoints)
5. [GraphQL](#graphql)
6. [Authentication](#authentication)
7. [Dependencies](#dependencies)
8. [License](#license)

## Introduction

The Social Media API provides basic functionalities for user registration, authentication, posting content, following/unfollowing users, and retrieving posts. It is built using Node.js and Express framework, with MongoDB as the database. GraphQL is integrated for querying user profiles and posts.

## Features

- User registration and authentication
- Posting content (text-based)
- Following and unfollowing other users
- Retrieving user posts and following users' posts
- GraphQL endpoint for querying user profiles and posts

## Setup

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set up environment variables by creating a `.env` file and defining the following variables:
    -  PORT=3000
    -  MONGODB_URI=<your-mongodb-uri>
    -  JWT_SECRET=<your-jwt-secret>

4. Start the server: `npm start`

## Endpoints

### User Endpoints

- `POST /register`: Register a new user
- `POST /login`: Login an existing user
- `GET /allusers`: Get all users
- `GET /user/posts/:userId`: Get posts for a specific user by userID
- `GET /following/posts/:userId`: Get posts including those posted by users the current user is following
- `POST /follow`: Follow a user
- `POST /unfollow`: Unfollow a user

### Post Endpoints

- `POST /post`: Create a new post

## GraphQL

The GraphQL endpoint is available at `/graphql`. You can use GraphiQL to explore the schema and execute queries.

## Authentication

Authentication is implemented using JSON Web Tokens (JWT). When a user registers or logs in, a JWT token is generated and sent back to the client. This token should be included in the authorization header for protected routes.

## Dependencies

- express
- mongoose
- bcryptjs
- jsonwebtoken
- express-graphql (for GraphQL endpoint)
- dotenv (for environment variables)
- cors

