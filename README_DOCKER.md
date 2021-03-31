### Docker Setup

The docker image contains postgres instance with these credentials:

```
- POSTGRES_DB=postgres
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=postgres
```

After bringing up the docker container:

````docker-compose -f "docker-compose.yml" up -d --build````

It will be served on localhost ``http://localhost:5001`` (You can update the port to the default 5432)

### Access the database

To access the postgress db run: and enter the password

``psql -h 127.0.0.1 -U postgres -p 5001``

Once logged in to the database you can list the database tables with ``\dt``