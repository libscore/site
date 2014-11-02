### API Server

The API server is run with node on port 3000, nginx uses a forward proxy to map it to port 80

```
cd libscore/api
forever start --watch -a -l /root/logs/forever.log -o /root/logs/out.log -e /root/logs/err.log api.js
```

### Alexa data

http://s3.amazonaws.com/alexa-static/top-1m.csv.zip
