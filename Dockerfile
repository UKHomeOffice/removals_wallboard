FROM quay.io/ukhomeofficedigital/centos-base

RUN rpm --rebuilddb
RUN yum-config-manager --enable cr
RUN yum install -y yum-utils epel-release
RUN yum install -y  \
  git \
  curl \
  which \
  nginx \
  gcc-c++ \
  bzip2

RUN mkdir -p /opt/nodejs
WORKDIR /opt/nodejs
RUN curl https://nodejs.org/dist/v4.2.2/node-v4.2.2-linux-x64.tar.gz | tar xz --strip-components=1

#WORKDIR /
COPY entry-point.sh /entry-point.sh
RUN chmod +x /entry-point.sh

RUN mkdir -p /var/log/nginx &&\
    ln -s /dev/stderr /var/log/nginx/error.log && \
    ln -s /dev/stdout /var/log/nginx/access.log

RUN useradd app
USER app

# internal homeoffice firewalls block ssh/git protocol
RUN git config --global url."https://".insteadOf git://

ENV PATH=${PATH}:/opt/nodejs/bin

RUN mkdir -p /home/app

WORKDIR /home/app

ADD package.json /home/app/package.json
ADD npm-shrinkwrap.json /home/app/npm-shrinkwrap.json
RUN npm install


COPY . .

USER root
RUN npm run build
RUN npm test


RUN cp -fr build/* /usr/share/nginx/html/

ENTRYPOINT ["/entry-point.sh"]
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
