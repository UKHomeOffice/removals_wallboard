FROM quay.io/ukhomeofficedigital/nginx:v0.2.7

USER 0
RUN apk update
RUN apk add --update --no-cache nodejs-npm git python2 g++ make
#                                     ^ needed for node-gyp
RUN chmod +w /var/www
RUN adduser -D -u 1001 app
USER 1001
RUN mkdir -p /home/app
RUN chmod +x /home/app

WORKDIR /home/app

COPY package.json npm-shrinkwrap.json ./
RUN npm install

COPY . .

RUN npm run build && \
    npm test
RUN cp -fr build/* /var/www
USER 100

ENTRYPOINT ["/home/app/entry-point.sh"]
