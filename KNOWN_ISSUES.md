# Known Issues

## Database Initialization

### Current Behavior

After bringing up the application using:

```bash
docker compose -f compose/docker-compose.dev.yml up -d
```

the MySQL database is created successfully, but the database schema is not initialized automatically.

As a temporary workaround, manually import the schema:

```bash
docker exec -i ecommerce-mysql mysql -uroot -ppassword ecommerce < schema.sql
```

Then restart the backend services:

```bash
docker compose -f compose/docker-compose.dev.yml restart product-service order-service inventory-service
```

### Planned Fix

This will be resolved by:

- Adding proper database initialization.
- Implementing database connection retry logic in the backend services.
- Removing the need for manual schema import and service restart.

**Goal:** A fresh clone should work with only:

```bash
docker compose -f compose/docker-compose.dev.yml up -d
```