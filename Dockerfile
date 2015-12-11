FROM quay.io/ukhomeofficedigital/centos-base

COPY index.html index.html
COPY ie.png ie.png

CMD ["/usr/bin/python", "-m", "SimpleHTTPServer"]