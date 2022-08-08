# See: https://github.com/mazgi/template.dockerized-nextjs-project/blob/main/Dockerfile.d/frontend/Dockerfile
FROM node:18-alpine as base

# ================================
# Begin builder stage
FROM base as builder
COPY rootfs /
WORKDIR /workspace

RUN npm install\
  && npm run test\
  && npm run build
RUN rm -rf /workspace/.next/cache
# End builder stage
# ================================

# ================================
# Begin runner stage
FROM base as runner
ENV NODE_ENV=production
WORKDIR /workspace
COPY --from=builder /workspace/.next /workspace/.next
COPY --from=builder /workspace/package*.json /workspace/
RUN npm install --only=production
CMD ["npm", "run", "start", "--","-p","${PORT:-3000}"]
# ================================
