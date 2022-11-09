FROM ubuntu:22.04 as base

LABEL maintainer="docker@mazgi.com"

# https://nodejs.org/en/blog/release/v18.12.0/
ARG NODE_VERSION=18.12.0
ENV NODE_VERSION=${NODE_VERSION:-18.12.0}
ARG GIT_SHORT_SHA=xxxxxxx
ENV GIT_SHORT_SHA=${GIT_SHORT_SHA:-xxxxxxx}

# Set in non-interactive mode.
ENV DEBIAN_FRONTEND=noninteractive

RUN : Create the user and working directory\
  && groupadd --gid 10000 node\
  && useradd --uid 10000 --gid node --shell /bin/bash --create-home node\
  && mkdir /workspace\
  && chown -R node:node /workspace\
  && :
RUN : Install basic packages\
  && echo 'apt::install-recommends "false";' > /etc/apt/apt.conf.d/no-install-recommends\
  && apt-get update\
  && apt-get install --assume-yes\
  tini\
  ca-certificates\
  curl\
  #   && :
  # RUN :\
  && : Install Node.js\
  && curl -o /tmp/nodejs.deb -fsSL https://deb.nodesource.com/node_18.x/pool/main/n/nodejs/nodejs_${NODE_VERSION}-deb-1nodesource1_amd64.deb\
  && apt-get install --assume-yes /tmp/nodejs.deb\
  && rm -f /tmp/nodejs.deb\
  #   && :
  # RUN :\
  && : Clean up\
  && apt-get clean autoclean\
  && apt-get autoremove --yes\
  && rm -rf /tmp/*\
  && rm -rf /var/lib/apt/\
  && rm -rf /var/log/*\
  && :
ENTRYPOINT ["/usr/bin/tini", "--"]
WORKDIR /workspace
USER node

FROM base AS builder-base
USER root
RUN :\
  && apt-get update\
  && apt-get install --assume-yes\
  jq\
  && :
USER node

# ================
# BFF
# ----------------
FROM builder-base AS bff-builder
COPY --chown=node:node bff ./
RUN :\
  && jq '.version += "+'${GIT_SHORT_SHA}'"' package.json > /tmp/package.json\
  && cat /tmp/package.json > package.json\
  && npm clean-install\
  && npm run build\
  && :

FROM base AS bff-runner
ENV DATABASE_URL=mysql://localhost:3306
ENV NODE_ENV=production
COPY --chown=node:node bff/package*.json ./
RUN :\
  && npm clean-install --only=production\
  && npm cache clean --force\
  && :
COPY --from=bff-builder --chown=node:node /workspace/dist ./
CMD [ "node", "main.js" ]
EXPOSE 4000
HEALTHCHECK --interval=2s --timeout=1s --start-period=10s --retries=2\
  CMD curl --fail --output /dev/null --silent 'http://localhost:4000/rest/status'
# ================

# ================
# Frontend
# ----------------
FROM builder-base AS frontend-builder
COPY --chown=node:node frontend ./
RUN :\
  && jq '.version += "+'${GIT_SHORT_SHA}'"' package.json > /tmp/package.json\
  && cat /tmp/package.json > package.json\
  && npm clean-install --only=production\
  && npm cache clean --force\
  && npm run build\
  && :

FROM base AS frontend-runner
ENV NODE_ENV=production
COPY --from=frontend-builder --chown=node:node /workspace/public ./public
COPY --from=frontend-builder --chown=node:node /workspace/.next/standalone ./
COPY --from=frontend-builder --chown=node:node /workspace/.next/static ./.next/static
CMD [ "node", "server.js" ]
EXPOSE 3000
HEALTHCHECK --interval=2s --timeout=1s --start-period=10s --retries=2\
  CMD curl --fail --output /dev/null --silent 'http://localhost:3000/api/status'
# ================
