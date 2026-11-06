# backend/Dockerfile
# What:  Builds the API image: production packages only, runs as a non-root user.
# Build: docker build -t creative-park-api ./backend
# Needs: backend/package-lock.json (create it once with `npm install` inside backend/).

FROM node:22.11.0-alpine AS deps
WORKDIR /app
# WHY: copy only the package files first so Docker reuses this layer until they change.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:22.11.0-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src
COPY migrations ./migrations
COPY seeds ./seeds
# WHY: the "node" user ships with the image and has no special powers (mandate Section 11).
USER node
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1:4000/health || exit 1
CMD ["node", "src/server.js"]
