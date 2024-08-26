# Databases

LJAS supports [PostgreSQL](https://postgresql.org) and [MongoDB](https://mongodb.com) with [Prisma](https://prisma.io).

This document is only relevant to the following Prisma-related starter projects:

| Starter Project Name                  | JavaScript                                                  | TypeScript                                                     |
| ------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| Express + MongoDB                     | [View Source](../../../starters/express-mongo)              | [View Source](../../../starters/express-mongo-ts)              |
| Express + PostgreSQL                  | [View Source](../../../starters/express-postgres)           | [View Source](../../../starters/express-postgres-ts)           |
| React + Express + MongoDB with SSR    | [View Source](../../../starters/react-express-mongo-ssr)    | [View Source](../../../starters/react-express-mongo-ssr-ts)    |
| React + Express + PostgreSQL with SSR | [View Source](../../../starters/react-express-postgres-ssr) | [View Source](../../../starters/react-express-postgres-ssr-ts) |

## Contents

-   [Why Prisma?](#why-prisma)
-   [Learning Resources](#learning-resources)
-   [Examples](#examples)

## Why Prisma?

We decided to use Prisma primarily because of the following:

-   Object-relational mapping (ORM) with support for both PostgreSQL & MongoDB
-   Auto-generated types when working with TypeScript
-   Migration system

The Prisma docs go over other good reasons to use their products in their [introduction docs](https://.prisma.io/docs/concepts/overview/why-prisma).

## Learning Resources

### PostgreSQL

-   [PostgreSQL tutorial](https://postgresql.org/docs/current/tutorial.html)  
    Learn the basic concepts for PostgreSQL and how to execute queries with `psql`.
-   [Prisma's relational database guide](https://prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)  
    Learn the basics for Prisma with PostgreSQL.

### MongoDB

-   [MongoDB manual introduction](https://mongodb.com/docs/manual/introduction)  
     Learn the basic concepts for MongoDB.
-   [`mongo` shell docs](https://mongodb.com/docs/v4.4/mongo)  
    Learn how to execute queries with the `mongo` shell.
-   [Prisma's MongoDB guide](https://prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb)  
    Learn the basics for Prisma with MongoDB.

## Examples

-   [Notes API (`notes-api`)](../../../examples/notes-api): REST API that uses PostgreSQL & Prisma
-   [\*chan (`starchan`)](../../../examples/starchan): Server-side rendered React app that uses MongoDB & Prisma

## Connecting a Natively Running App with a Containerized Database

Some may prefer running their app natively while connecting it to the database running in a container. This creates what we refer to as a hybrid dev environment and can be a great option for those who want to see improved performance for app development but still want all of the conveniences that come with running the database in the Docker dev environment.

To set this up, first remove the `app` service and its dependent volumes in the Docker Compose config file. You can reference [an example that applies these changes to the **Express + PostgreSQL starter's** `docker-compose.yml` file.](./docker-compose.hybrid-example.yml)

Then all you need to do is modify the `DATABASE_URL` environment variable in the `.env` file to the appropriate connection string so Prisma can connect to the database.

If you're working with unchanged values from the initial setup, then all you need to do is change `db` in the existing connection string to `localhost`.

Using the [**Express + Postgres starter's** `.env` file](../../../starters/express-postgres/.env.example) as an example, you would modify this...

```
DATABASE_URL="postgresql://postgres:password@db:5432/postgres?schema=public"
```

...to this...

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres?schema=public"
```

## Connecting to Docker Databases

After a database container is up and running, you can connect to it with the following commands depending on your database type:

### MongoDB

```console
docker exec -it ljas-express-mongo-db mongo -u mongo
```

### PostgreSQL

```console
docker exec -it ljas-express-postgres-db -u postgres psql
```

## Prisma Type Error Fix

You may encounter a case where TypeScript is throwing type errors with your Prisma-related code. If this is happening, try running [`prisma generate`](https://prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client) to generate the [Prisma Client](https://prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction).

You can use the `prisma` `package.json` script to do this:

```console
npm run prisma generate
```

Note that if you ever make any changes to the Prisma schema, you must re-run `prisma generate` to update the Prisma Client as well.

## Why do you still use MongoDB 4 and not a newer version?

At the moment the [official Prisma example uses a MongoDB 4 base image](https://github.com/prisma/prisma/blob/main/docker/mongodb_replica/Dockerfile) so we follow and do the same.