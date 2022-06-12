# Registration form for Wild Code School

## Process

- create a new github repository with .gitignore file for Node.js
- clone repository to your working directory for the future project
- create two folders: server and client

### Server side

#### Prepare repository and set up mongodb cluster
- cd server && npm init 
- npm i mongoose nodemon dotenv express
- in package.json add scripts to start the server 
- create index.js 
- setup a mongodb cluster via https://www.mongodb.com/
- remember to whitelist your ip
- once a cluster is created copy a connection string and save it to .env file in server folder

#### Create a model for DB
- create a folder for models 
- use mongoose to create a schema 
- create a connection to your db and test it

#### Create routes
- create a folder routes and a file argonautRoute.js in it
- create 3 routes: create, delete and list argonauts (later on add update route as well)
- test all routes with insomnia

### Client   
- cd to client
- run npx create-react-app . to create an app in the client folder
- delete all unnecessary files 
- npm start to check that the app is up
- in src folder create folder component 
- npm i react-router-dom axios node-sass

#### Steps: 
- Create a basic navbar with links to homepage, login and register page
- Create Router.js to deal with routing 
- RenderArgonaut will be used to return a single argonaut from our DB as well as for handling a deletion. 
- Argonaut is used to create and save a new argonaut, and creates a form for that purpose. 
- Main will be returning the list of argonauts and opening the form to register a new one. 

### Style with sass 
I used node sass for styling but will be changing to dart sass later on. 

## To be continued...
The app is not finished. 
Some of the features missing and to be added asap are:
- pop up confirmation for delete action
- update option for an argonaut (back is ready but don't have React part yet)
- authentication with jwt token, hashing and cookies (was not a part of the task)
- better styling 
- deployment to Azure (App service)
- better error handling and input validation

## How to 
- cd client & npm start
- cd server & npm run dev
- you would need to create your own free mongodb cluster and set the correct connection string in .env file 