# Docker Forum Infrastructure

This project uses Docker Compose to run the client, server, and PostgreSQL together.

## Security rules

- Do not commit real tokens, passwords, or third-party credentials.
- Keep secrets in the local `.env` file only.
- Use `.env.sample` or `.env.example` as the template for local configuration.

## Files used for local configuration

- `.env.sample` - tracked template for local development and Docker Compose.
- `.env.example` - duplicate tracked template for developers who expect the `example` naming.
- `.env` - local untracked file with actual values.

## Required environment variables

`CLIENT_PORT`
Port published for the client application.

`SERVER_PORT`
Port published for the server application.

`POSTGRES_PORT`
Port published for PostgreSQL on the host machine.

`POSTGRES_USER`
PostgreSQL user used by the server container.

`POSTGRES_PASSWORD`
PostgreSQL password used by the server container.

`POSTGRES_DB`
PostgreSQL database name.

`EXTERNAL_SERVER_URL`
Server URL used by the browser-facing client bundle. Default local value: `http://localhost:3001`.

`INTERNAL_SERVER_URL`
Internal Docker network URL used for SSR or server-side requests. Default local value: `http://server:3001`.

`NO_SSR`
Existing project flag kept in the template because it is already part of the local environment shape.

## What is required for local start

1. Docker Desktop or Docker Engine with `docker compose`.
2. A local `.env` file created from `.env.sample` or `.env.example`.
3. Free local ports for client, server, and PostgreSQL.

Default local ports:

- `3000` for the client
- `3001` for the server
- `5432` for PostgreSQL

## Minimal local start steps

1. Create `.env` from `.env.sample`.
2. Check or adjust the values in `.env`.
3. Run `docker compose up --build`.
4. Open `http://localhost:3000`.
5. Check server health at `http://localhost:3001/health`.

## Service dependencies in Docker Compose

- `postgres` has a healthcheck based on `pg_isready`.
- `server` starts only after `postgres` becomes healthy.
- `client` starts only after `server` becomes healthy.

## Persistent data

PostgreSQL data is stored in the Docker named volume `postgres-data`.
