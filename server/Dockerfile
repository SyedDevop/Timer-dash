FROM node:16.13-alpine as builder

LABEL version="1.1.0"
LABEL description="Timer dash api server."
ARG name="Timer_dash_server"

WORKDIR /app
COPY package.json ./
RUN npm install 
COPY . .
RUN npx prisma migrate dev --name "init"
RUN npm run build

## this is stage two , where the app actually runs
FROM node:16.13-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only=production

COPY --from=builder /app/lib ./lib
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm install pm2 -g
EXPOSE 5000
CMD ["pm2-runtime","./lib/index.js"]


