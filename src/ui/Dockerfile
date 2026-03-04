# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./

# Upgrade npm (optional) and install deps with legacy peer deps
RUN npm install -g npm@11.6.2
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
