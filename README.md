# sba-318 - [Visit Live Deployment](https://sba-318-5baaf06f883e.herokuapp.com/)

## About the Project

This assessment measures your understanding of Node and Express and your capability to implement their features in a practical manner. You have creative freedom in the topic, material, and purpose of the web application you will be developing, so have fun with it! However, remember to plan the scope of your project to the timeline you have been given.

## Objectives

-   Create a server application with Node and Express.
-   Create a RESTful API using Express.
-   Create Express middleware.
-   Use Express middleware.
-   Use a template engine to render views with Express.
-   Interact with a self-made API through HTML forms.

## Built With

-   JavaScript
-   Node
-   npm
-   nodemon
-   Express

## Getting Started

### Prerequisites

-   npm (Node Packet Manager)

    -   To install npm, you need to install Node.js, which includes npm
    -   Install Node.js via installer: https://nodejs.org/en/download/current
    -   Verify installation by running

        ```sh
        node -v
        npm -v
        ```

    -   If installed correctly, these commands will display the versions of Node.js and npm installed on your system

### Installation

1. Clone the repo and then navigate to the new directory
    ```sh
    git clone https://github.com/dean-ferreira/module-318.git
    cd module-318
    git checkout sba-318
    ```
2. Install all Development Dependencies listed in package.json
    ```sh
    npm install
    ```

## Usage

-   Start a server:
    ```sh
    npm start
    ```
-   To start a development server with nodemon:
    ```sh
    npm run dev
    ```
-   To start a development server within a Docker container:
    ```sh
    npm run docker-dev
    ```
