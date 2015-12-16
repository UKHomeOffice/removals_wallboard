FROM quay.io/ukhomeofficedigital/centos-base

RUN rpm --rebuilddb && \
    yum install -y yum-utils epel-release && \
    yum-config-manager --enable cr && \
    yum install -y nginx 

RUN ln -s /dev/stderr /var/log/nginx/error.log && ln -s /dev/stdout /var/log/nginx/access.log

COPY entry-point.sh /entry-point.sh
WORKDIR /usr/share/nginx/html/
COPY app/* .

ENTRYPOINT ["/entry-point.sh"]
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
