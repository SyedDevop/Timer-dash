FROM node:16.13-alpine as build

LABEL version="1.0.0"
LABEL description="Timer dash frountend app."

# set the working directory to the root of the project
WORKDIR /app

# copy the project into the build context
COPY . ./

# prepare the container for building react app
# COPY package*.json ./
RUN npm install 

RUN npm run build

# copy the build output to the container
# COPY ./build/ /app/build/

# prepare nginx
FROM nginx:alpine
EXPOSE 3000

COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf


# CMD ["nginx", "-g", "daemon off;"]