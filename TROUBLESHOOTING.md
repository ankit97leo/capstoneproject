# Known Issues

## Database Initialization

### Issue

During the initial Docker Compose setup, the backend services attempted to connect to MySQL before the database schema was fully initialized.

This resulted in errors such as:

- `ECONNREFUSED`
- Missing database tables
- Backend services exiting during startup

As a consequence, the application required manual intervention after deployment.

---

### Temporary Workaround (Current)

After starting the application:

```bash
docker compose -f compose/docker-compose.dev.yml up -d
```

Import the database schema manually:

```bash
docker exec -i ecommerce-mysql mysql -uroot -ppassword ecommerce < schema.sql
```

Restart the backend services:

```bash
docker compose -f compose/docker-compose.dev.yml restart product-service order-service inventory-service
```

---

### Improvements Implemented

The following improvements have already been completed:

- ✅ Added MySQL health checks in Docker Compose.
- ✅ Configured backend services to restart on failure.
- ✅ Externalized database configuration using environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
- ✅ Standardized configuration across all backend services.

These changes significantly improved the reliability of the Docker Compose deployment.

---

### Remaining Limitation

The database schema is still imported manually after a fresh deployment.

This is because the backend services currently assume that the required tables already exist.

---

### Planned Enhancement

The remaining manual steps will be removed by:

- Automating database schema initialization.
- Ensuring backend services can start without manual intervention.
- Optionally implementing database connection retry logic for improved resilience.

---

### Target State

A fresh clone of the repository should require only:

```bash
docker compose -f compose/docker-compose.dev.yml up -d
```

with:

- Automatic database initialization
- Automatic backend startup
- No manual SQL import
- No manual service restart