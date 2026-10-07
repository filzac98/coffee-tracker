# Stage 1: install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: build the app
FROM deps AS build
COPY . .
RUN npm run build

# Stage 3: small final image with only the standalone server
FROM node:22-alpine
WORKDIR /app
ENV HOSTNAME=0.0.0.0
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
USER node
CMD ["node", "server.js"]
