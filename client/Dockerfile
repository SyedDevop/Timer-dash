FROM node:16.13-alpine as build

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
COPY --from=build /app/dist/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]