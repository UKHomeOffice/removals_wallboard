FROM quay.io/ukhomeofficedigital/centos-base

COPY index.html index.html

CMD ["/usr/bin/python", "-m", "SimpleHTTPServer"]
