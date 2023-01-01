# https://github.com/mazgi/dockerfiles/blob/main/Dockerfile.d/node-webapp.development/customize-example.Dockerfile
FROM ghcr.io/mazgi/node-webapp.development AS default

ARG GID=0
ARG UID=0
ENV NODE_ENV=development

RUN :\
  # Create the development user with the same UID and GID as you.
  && useradd --comment '' --create-home --gid users --uid ${UID} developer\
  && groupadd --gid ${GID} developer || true\
  && usermod --append --groups ${GID} developer || true\
  && echo '%users ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/grant-all-without-password-to-users\
  && echo '%developer ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/grant-all-without-password-to-developer\
  && :

FROM default AS e2e-tests

ARG PLAYWRIGHT_BROWSERS_PATH
ENV PLAYWRIGHT_BROWSERS_PATH=${PLAYWRIGHT_BROWSERS_PATH:-/usr/local/cache/ms-playwright}
ENV NODE_ENV=development

RUN :\
  && npx playwright install-deps\
  # Create browser cache dir and set the owner
  # See also https://playwright.dev/docs/browsers#managing-browser-binaries
  && mkdir -p ${PLAYWRIGHT_BROWSERS_PATH}\
  && chown -R developer:users ${PLAYWRIGHT_BROWSERS_PATH}\
  && :
USER developer
RUN :\
  && npx playwright install\
  && :
USER root
