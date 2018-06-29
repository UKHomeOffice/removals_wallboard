FROM quay.io/ukhomeofficedigital/nginx:v0.2.7

RUN apk update
RUN apk add --update --no-cache nodejs-npm git python2 g++ make
#                                     ^ needed for node-gyp
WORKDIR /var/www

COPY package.json npm-shrinkwrap.json ./
RUN npm install

COPY . .

RUN npm run build
RUN cp -fr build/* /var/www
RUN chmod +r /var/www/config.js

USER 100
ENTRYPOINT ["/var/www/entry-point.sh"]
