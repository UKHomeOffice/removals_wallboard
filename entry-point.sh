#!/usr/bin/env bash

set -u
set -e

for f in /etc/secrets/* ; do
    if test -f "$f"; then
        export $(echo $(basename $f) | awk '{print toupper($0)}')="$(eval "echo \"`<$f`\"")"
    fi
done

cat <<- EOF > /usr/share/nginx/html/config.js
var config = {
  "backend": "${BACKEND:-http://localhost:8000}",
  "keycloakUrl": "${KEYCLOAKURL:-http://localhost:8000}",
  "clientId": "${CLIENTID:-ircbd-dev}",
  "keycloakAccountService": "${KEYCLOAKACCOUNTSERVICE:-http://localhost:8000}"
}
EOF


sed -i '/include \/etc\/nginx\/conf.d/q' /etc/nginx/nginx.conf
echo '}' >> /etc/nginx/nginx.conf

cat <<- EOF > /etc/nginx/conf.d/server.conf
server {
    listen       ${PORT:-8000} default_server;
    listen       [::]:${PORT:-8000} default_server;
    server_name  _;
    root         /usr/share/nginx/html;

    location = /health {
      return 200 'ok';
      access_log off;
    }

    location / {
    }

    error_page 404 /404.html;
       location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}
EOF

exec "$@"
