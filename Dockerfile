# Etape de build
FROM node:20.12-alpine3.19 AS build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]