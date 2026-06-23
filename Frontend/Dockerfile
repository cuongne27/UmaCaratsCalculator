# Use Debian-slim base to avoid native binary issues on Alpine and improve compatibility
FROM node:20-bullseye-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent

FROM node:20-bullseye-slim AS builder
WORKDIR /app
# reuse cached node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
# Only copy the built app and production files
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "run", "start"]
