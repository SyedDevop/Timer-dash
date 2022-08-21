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

# migrate prisma database
RUN npm run prisma-migrate
RUN npm run prisma-migrate-production

# strat the server
EXPOSE 3001
CMD ["node", "lib/index.js"]

# copy the build output to the container
# CMD [ "npx", "pm2", "start", "--name", "timer-api", "--", "npm", "start" ]

