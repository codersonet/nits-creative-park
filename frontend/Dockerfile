# frontend/Dockerfile
# What:  Builds the React app, then serves the static files with unprivileged Nginx.
# Build: run from the repository root, because the app imports legacy files through @legacy:
#        docker build -f frontend/Dockerfile -t creative-park-web .
# Needs: frontend/package-lock.json (create it once with `npm install`)
#        and infra/nginx/frontend.conf (added in Batch 7).

FROM node:22.11.0-alpine AS build
WORKDIR /app

# Build-time settings. VITE_ values are baked into the files, so they must be public values only.
ARG VITE_SITE_URL=https://codersonet.github.io/nitsikkim-creatives
ARG VITE_BASE_PATH=/
ARG VITE_API_BASE_URL=/api/v1
ARG VITE_USE_MOCK_DATA=true
ENV VITE_SITE_URL=$VITE_SITE_URL \
    VITE_BASE_PATH=$VITE_BASE_PATH \
    VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_USE_MOCK_DATA=$VITE_USE_MOCK_DATA

# WHY: install first so Docker reuses this layer until the package files change.
COPY frontend/package.json frontend/package-lock.json frontend/
RUN npm --prefix frontend ci
COPY . .
RUN npm --prefix frontend run build

# WHY: nginx-unprivileged runs as a non-root user (mandate Section 11).
FROM nginxinc/nginx-unprivileged:1.27.2-alpine
COPY infra/nginx/frontend.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html
EXPOSE 8080
