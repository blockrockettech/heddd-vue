# Create the container from the alpine linux image
FROM node:lts-alpine

# Create the directories we will need
RUN mkdir -p /tmp/nginx/hedd-vue-spa-nginx

# Set the directory we want to run the next commands for
WORKDIR /tmp/nginx/hedd-vue-spa-nginx
# Copy our source code into the container
COPY . .
# Install the dependencies, can be commented out if you're running the same node version
RUN npm install

# reuild sass for this os
RUN npm rebuild node-sass

# run webpack and the vue-loader
RUN npm run build

FROM nginx:stable-alpine-perl

RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html

# copy the built app to our served directory
COPY --from=0 /tmp/nginx/hedd-vue-spa-nginx/dist/ /var/www/html

# Copy the respective nginx configuration files
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf

# make all files belong to the nginx user
RUN chown nginx:nginx /var/www/html

# start nginx and keep the process from backgrounding and the container from quitting
CMD sed -i.bak s/DOCKER_PORT/$PORT/g /etc/nginx/nginx.conf && nginx -g "daemon off;"
