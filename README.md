# MERN Social Media App

This is a social media application built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication and authorization
- Create, read, update, and delete posts
- Create, read, update, and delete messages
- Like and comment on posts
- Follow and unfollow users
- Real-time notifications

## Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/Socrattees/mern-social-media-app.git
  ```
2. Navigate to the project directory:
  ```sh
  cd mern-social-media-app
  ```
3. Install server dependencies:
  ```sh
  cd api
  npm install
  ```
4. Install client dependencies:
  ```sh
  cd ../client
  npm install
  ```
5. Install socket.io dependencies:
  ```sh
  cd ../socket
  npm install
  ```

## Usage

The current version of the project uses 3 different ports

1. Start the server (port 3000 by default):
  ```sh
  cd server
  npm start
  ```
2. Start the client (port 8800 by default):
  ```sh
  cd ../client
  npm start
  ```
3. Start socket.io (port 8900 by default):
  ```sh
  cd ../socket
  npm start
  ```
3. Open your browser and navigate to `http://localhost:3000`

Should you desire to change any of the 3 ports, here are things to take into consideration:
  - If you want to change the port of the client:
    -- First option is to navigate to the client folder, go to package.json and change the "start" script value to "PORT=[new port value like 3001] react-scripts start".
    -- Second option is to create or navigate to .env add the entry "PORT=[new port value like 3001]".
    -- If either of these options are used, make sure to navagiate to the socket folder, go to index.js and change the value of the origin property within the cors object that is stored in the io variable to incorporate the new change (e.g."http://localhost:3001").
  - If you want to change the port of the server:
    - Navigate to api folder, go to index.js and change the app.listen() port arg from the value that is there (may be 8800) to the port that you desire.
    -- Once change has been made, navigate to the client folder, go to package.json and change the value of the "proxy" property to include the new port value. This is so that the client is able to proxy towards the new port.
  - If you want to change the port of the socket:
    -- Navigate to socket folder, go to index.js and change the arg of the new Server() declaration that is assigned to the variable io from the existing port (may be 8900) to the new port.
    -- Should you still like the socket to log to the console when it is run, you may want to change the message to replace the old port with the new port.