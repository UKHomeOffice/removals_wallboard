FROM quay.io/ukhomeofficedigital/nodejs-base:v8

RUN rpm --rebuilddb && \
    yum update -y && \
    yum-config-manager --enable cr && \
    yum install -y \
      yum-utils \
      epel-release && \
    yum install -y \
      git \
      fontconfig \
      nginx \
      gcc-c++ \
      bzip2

RUN mkdir -p /var/log/nginx &&\
    ln -s /dev/stderr /var/log/nginx/error.log && \
    ln -s /dev/stdout /var/log/nginx/access.log

RUN adduser -u 1001 app
USER 1001

# internal homeoffice firewalls block ssh/git protocol
RUN git config --global url."https://".insteadOf git://

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package.json npm-shrinkwrap.json ./
RUN npm install

COPY . .

USER root
RUN npm run build && \
    npm test && \
    cp -fr build/* /usr/share/nginx/html/

ENTRYPOINT ["/home/app/entry-point.sh"]
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
