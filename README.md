# IHC Project

## Cloning the project

Clone rescursively, to download the submodules:

```
  git clone --recursive git@github.com:kiyoshijo/ihc-project.git
```

## Running the app

Install node & npm [https://nodejs.org/](https://nodejs.org/)

Install ionic & cordova:

```
  npm install -g cordova ionic
```

Enter on app folder and run:

```
  npm install && ionic serve
```

## Running the backend (with Docker)

Install docker [https://www.docker.com/](https://www.docker.com/)

Install docker-compose [https://docs.docker.com/compose/](https://docs.docker.com/compose/)

Run:

```
  docker-compose up
```

Access the API Documentation on: [http://localhost:3000/explorer](http://localhost:3000/explorer)

## Running the backend (with Node and data saving on memory)

Install node & npm [https://nodejs.org/](https://nodejs.org/)

Install loopback:

```
  npm install -g strongloop
```

Enter on the ihc-backend folder and run:

```
npm install && npm start
```

Access the API Documentation on: [http://localhost:3000/explorer](http://localhost:3000/explorer)

## Running the backend (with Node and data saving on mongo)

Install node & npm [https://nodejs.org/](https://nodejs.org/)

Install mongodb [https://www.mongodb.org/](https://www.mongodb.org/)

Install loopback:

```
  npm install -g strongloop
```

Configure the local datasource file, on: ihc-backend/server/datasources.local.json with your mongo info:

```
  {
    "mongo": {
      "name": "mongo", // Not modify this
      "host": "DATABASE_HOST",
      "port": "DATABASE_PORT",
      "database": "DATABASE_NAME",
      "connector": "mongodb", // Not modify this
      "debug": true // Not modifu this
    }
  }
```

Set the environment var NODE_ENV to "local", on Linux:

```
  export NODE_ENV=local
```

Enter on the ihc-backend folder and run:

```
npm install && npm start
```

Access the API Documentation on: [http://localhost:3000/explorer](http://localhost:3000/explorer)
