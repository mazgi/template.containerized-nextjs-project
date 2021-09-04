# template.dockerized-nextjs-project

[![default](https://github.com/mazgi/template.dockerized-nextjs-project/workflows/default/badge.svg)](https://github.com/mazgi/template.dockerized-nextjs-project/actions?query=workflow%3Adefault)

## How to run

Create .env file like below.

```
rm -f .env
test $(uname -s) = 'Linux' && echo -e "UID=$(id -u)\nGID=$(id -g)" >> .env
cat<<EOE >> .env
BIND_IP_ADDR=192.168.0.1
PUBLIC_IP_ADDR_OR_FQDN=203.0.113.1
EOE
```

Start Docker containers.

```shellsession
docker-compose up
```
