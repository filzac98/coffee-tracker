# Stage 1: install dependencies
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./ 
# Kun package-filerne kopieres her. Docker cacher hvert lag
RUN npm ci

# Test-stage: kildekode + alle dev-dependencies. Kører Jest-unittestene
# Kør: docker compose run --rm backend-test
FROM deps AS test
COPY . .
CMD ["npm", "test"]

# Stage 2: build the app and remove dev dependencies
FROM deps AS build
COPY . .
# Nu kopieres hele koden
RUN npm run build && npm prune --omit=dev

# Stage 3: small final image with only what is needed to run
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# Stage 1 og 2 smides væk. Kun det der eksplicit kopieres fra --from=build kommer med i det endelige image
USER node
CMD ["node", "dist/main"]
