# template.dockerized-nextjs-project

[![unit-tests](https://github.com/mazgi/template.dockerized-nextjs-project/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/mazgi/template.dockerized-nextjs-project/actions/workflows/unit-tests.yml)

This repository is a template for developing Web Applications using [Next.js](https://nextjs.org/) and TypeScript.

## How to Use

<u>Docker and [Docker Compose](https://docs.docker.com/compose/)</u> are needed. If you want to develop and run locally, that's all.

### Step 1: Write out your IDs and information in the .env file

If you have an old `.env` file, you are able to reset it by removing it.

```console
rm -f .env
```

```.env
UID=1234
GID=1234
DOCKER_GID=2345
BIND_IP_ADDR=192.168.0.1
PUBLIC_IP_ADDR_OR_FQDN=203.0.113.1
```

:information_source: If you are using Linux, write out UID, GID, and GID for the `docker` group, into the `.env` file to let that as exported on Docker Compose as environment variables.

```console
test $(uname -s) = 'Linux' && {
  echo -e "DOCKER_GID=$(getent group docker | cut -d : -f 3)"
  echo -e "GID=$(id -g)"
  echo -e "UID=$(id -u)"
} >> .env || :
```

:information_source: If you develop in a remote environment such as VM, Cloud, a PC placed in another room, and others, write the IP address and FQDN into the `.env` file, such as `BIND_IP_ADDR` and `PUBLIC_IP_ADDR_OR_FQDN`, the same as the previous steps.

Though you don't need to define these values if you are developing and running locally and connecting locally to local.

```console
cat<<EOE >> .env
BIND_IP_ADDR=192.168.0.1
PUBLIC_IP_ADDR_OR_FQDN=203.0.113.1
EOE
```

The `BIND_IP_ADDR` is used to bind your services, such as web applications you are developing, RDBMS, and others. And `PUBLIC_IP_ADDR_OR_FQDN` is used to connect and identify your services, such as Web API endpoints, allowed origins for CORS settings, and others.

In almost all situations, the BIND_IP_ADDR is your local IP address, and you are able to get this value via CLI and GUI such as `ip addr show`, `ifconfig`, `ipconfig`, and others.  
Typically, the `BIND_IP_ADDR` and `PUBLIC_IP_ADDR_OR_FQDN` are the same if you use a VM in your local and other regular situations.

However, if you are developing in an environment under NAT, you should get your public IP address or FQDN and set this value as PUBLIC_IP_ADDR_OR_FQDN.  
This situation can happen if you develop on a Cloud VM such as Amazon EC2, Azure VM, Google Compute Engine(GCE), etc.

#### Environment Variable Names

Environment variable names and uses are as follows.

| Name       | Required on Linux | Value                                                                                                                                   |
| ---------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| DOCKER_GID | **Yes**           | This ID number is used to provide permission to read and write your docker socket on your local machine from your container.            |
| GID        | **Yes**           | This ID number is used as GID for your Docker user, so this ID becomes the owner of all files and directories created by the container. |
| UID        | **Yes**           | The same as the above UID.                                                                                                              |

| Name                   | Value                                                            |
| ---------------------- | ---------------------------------------------------------------- |
| BIND_IP_ADDR           | It's used to bind your services.                                 |
| PUBLIC_IP_ADDR_OR_FQDN | It's used by the Frontend to connect the BFF you are developing. |

### Step 2: Start services via Docker Compose

You are able to start Docker Compose services/containers in the background and follow logs, as below.  
If you want to stop tailing logs, type `^c`.

```console
docker compose up --detach && docker compose logs --follow
```

You are always able to start and stop to show logs for specific the service/container as below.

```console
docker compose logs --follow bff
```

```console
docker compose logs --follow frontend
```

```console
docker compose exec bff npm run test
```

```console
docker compose exec frontend npm run test
```

```console
docker compose down
```
