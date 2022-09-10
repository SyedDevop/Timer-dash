FROM node:16.13-buster-slim as builder

LABEL description="Timer dash api server."
ARG name="Timer_dash_server"

WORKDIR /app
COPY package.json ./
RUN apt update -qy && apt install openssl -qy
RUN npm install
COPY . .
RUN npm run prisma-migrate
RUN npm run build

## this is stage two , where the app actually runs
FROM node:16.13-buster-slim
WORKDIR /app
COPY package.json ./
RUN npm install --only=production

COPY --from=builder /app/lib ./lib
COPY --from=builder /app/prisma ./prisma
RUN apt update -qy && apt install openssl -qy
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm install pm2 -g
EXPOSE 5000
CMD ["pm2-runtime","./lib/index.js"]


