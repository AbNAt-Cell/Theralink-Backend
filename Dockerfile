# --- Base Stage ---
    FROM node:18-alpine AS base
    WORKDIR /app
    
    # Copy package files
    COPY package*.json ./
    
    # Copy Prisma schema first so 'prisma generate' works
    COPY prisma ./prisma
    
    # Install dependencies (dev included, because we need TS & Prisma)
    RUN npm install
    
    # Copy all source files
    COPY . .
    
    # Build TypeScript → JavaScript
    RUN npm run build   # creates /app/build
    
    # --- Production Stage ---
    FROM node:18-alpine AS production
    WORKDIR /app
    
    # Copy package files
    COPY package*.json ./
    
    # Copy Prisma schema
    COPY prisma ./prisma
    
    # Install only production dependencies
    RUN npm install --omit=dev
    
    # Install Prisma CLI temporarily to generate client (required for @prisma/client)
    RUN npm install prisma@^5.22.0 --save-dev
    
    # Generate Prisma Client (required for runtime)
    RUN npx prisma generate
    
    # Copy compiled JS from build stage
    COPY --from=base /app/build ./build
    
    # Start server
    CMD ["node", "build/server.js"]
    