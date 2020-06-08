# Pizza API

Node.js API for the Pizza APP, for any of the following commands you will need to be inside the "pizza-api" folder.

## Commands

```bash
# Configuring environment variables
cp default.env .env
vi .env # It opens a Vim instance, you can edit it in your favorite editor

# Installing
yarn

# Run Postgres (Docker) in a separated terminal
docker-compose up

# Running Node.js locally
yarn start

# Building for production
yarn build
```

## Running locally

It Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Deploying

For production proposes I highly reccomend to use a dedicated Postgres (or other DB supported by TypeORM) service, the docker instance is for local usage.<br>
If you are using another database you will need to update the package.json and the src/config.ts file.
