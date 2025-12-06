# --- Base Stage ---
    FROM node:18-alpine AS base
    WORKDIR /app
    
    # Install dependencies
    COPY package*.json ./
    RUN npm install
    
    # Copy all project files
    COPY . .
    
    # Build TypeScript → JavaScript
    RUN npm run build   # This creates /app/build
    
    
    # --- Production Stage ---
    FROM node:18-alpine AS production
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install --omit=dev
    
    # Copy compiled JS only (not TS)
    COPY --from=base /app/build ./build
    
    # Start server
    CMD ["node", "build/server.js"]    