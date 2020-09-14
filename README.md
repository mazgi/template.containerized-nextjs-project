# template.dockerized-nextjs-project

[![default](https://github.com/mazgi/template.dockerized-nextjs-project/workflows/default/badge.svg)](https://github.com/mazgi/template.dockerized-nextjs-project/actions?query=workflow%3Adefault)

## How to run

Create .env file like below.

```
UID=1000 # for Linux
GID=100 # for Linux
BIND_IP_ADDR=192.168.0.1
PUBLIC_IP_ADDR=192.168.0.1
```

Start Docker containers.

```shellsession
docker-compose up
```
