FROM node:16.13-alpine as build

LABEL version="1.0.0"
LABEL description="Timer dash api server."

# set the working directory to the root of the project
WORKDIR /app
# copy the project into the build context
COPY . ./
# prepare the container for building react app
# COPY package*.json ./
RUN npm install 
RUN npm run build

## this is stage two , where the app actually runs
FROM node:16.13-alpine
WORKDIR /app
COPY . ./
RUN npm install --only=production
COPY --from=build /app/lib .
COPY --from=build /app/prisma .

# migrate prisma database
RUN npm run prisma-migrate
RUN npm run prisma-migrate-production
RUN npm install pm2 -g
EXPOSE 2050
CMD ["pm2-runtime","index.js"]


