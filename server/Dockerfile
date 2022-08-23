FROM node:16.13-alpine as builder

LABEL version="1.1.0"
LABEL description="Timer dash api server."

WORKDIR /app
COPY package.json ./
RUN npm install 
COPY . .
RUN npx prisma generate
RUN npm run build

## this is stage two , where the app actually runs
FROM node:16.13-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only=production

COPY --from=builder /app/lib ./lib
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate
EXPOSE 2050
CMD ["node","./lib/index.js"]


