# Removals Wallboard
  
## Settings

Can either be set as an environment or as a secret.

* BACKEND - Where the Sails API can be found.  Defaults to http://localhost:8080

### Use (for devs)

```
docker build -t wallboard .
docker run 
    -e BACKEND=http://localhost:8080
    -p 8000:80 
    -v ${PWD}/app:/usr/share/nginx/html/
    wallboard
```

