FROM node:18-alpine AS base
WORKDIR /app
COPY app ./app
COPY package*.json ./

RUN npm install

FROM base AS build
WORKDIR /app
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./

RUN npm install --only=production
COPY --from=base /app/src ./

CMD [ "node", "./src/index.js" ]
