# React & Node

React as frontend and Node as Middle Layer

[View Online](https://reactandnode.herokuapp.com/)

https://reactandnode.herokuapp.com/

### 0. To start

```
npm install
```

### 1. To run react frontend code

###### Note: this will only run frontend through webpack-dev-server, which means you are not able to fetch any data from node api endpoints

```
npm run startfrontend
```

### 2. To run node server code

###### Note: this will only run node api server, you can test all the api endpoints through postman

```
npm run server
```

### 3. To run dev environment (running node server and react frontend at the same time)

###### Note: this will run both node api server and react front end, this is the command you want to run during development

```
npm run dev
```

### 4. To build all your static asssets after development


```
npm run build
```

# All things that this react-node project can do

### 1. This Node server can serve all static assets (in fast loading speed) , and provide AJAX response (JSON data) through NODE endpoints

### 2. All the endpoints can be used for both webapp and mobile platform

###### Benefit: IOS/Android can send request to NODE api endpoints rather remote API Server endpoints directly. this will prevent inconsistent data in database between mobile and webapp platform

### 3. Security: session verification + CSRF attack proof + RBAC (role based access control)

###### we need to do RBAC on both NODE endpoints side and React page routes

### 4. Code Spliting

###### Benefit 1. user will not be able to download the JS code that his role dont have access to

###### Benefit 2. faster loading speed

### 5. Session management

###### This project use connect-mogo to stroe session in a seperate MongoDB database, you can optionally store the session in redis

### 6. Data validation: validate any frontend data before submitting data to remote API server

###### Benefit: Prevent user from providing invalid data to our API server

### 7. Data modification and manipulation

###### Benefit: filtering data in the NODE layer, then transmiting the data to frontend will be much faster than transmiting the data to frontend, then filtering data in the frontend

### 8. Server Side Rendering (optional)


# Remote API server used in this project: URL: "https://www.superapp.ca/api" (this can be changed to companies's API server)
###### Note: http request to fetch the static assets are handled by Node server. All other ajax request are filtered by Node server's business logic endpoints and proxyed to the remote API server.

# Node server api endpoints: 
###### (to be continued)
