FROM quay.io/ukhomeofficedigital/centos-base

COPY index.html index.html
COPY ukvi.png ukvi.png

CMD ["/usr/bin/python", "-m", "SimpleHTTPServer"]