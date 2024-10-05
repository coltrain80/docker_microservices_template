# Use an official PostgreSQL image as a base
FROM postgres:15-alpine

# Copy initialization scripts
COPY init_scripts /docker-entrypoint-initdb.d/
