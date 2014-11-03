libscore
========



Libscore.com
===========

To learn about Libscore, read the [full overview](https://medium.com/@Shapiro/be93165fa497).

For Libscore's API documentation, see [this document](API.md).

To help us locate the Github page for a JavaScript library, see [this thread](https://github.com/julianshapiro/libscore/issues/1).

To help us whitelist a popular library that Libscore is failing to detect, see [this thread](https://github.com/julianshapiro/libscore/issues/2).

--

While the maintainers of Libsore do not have the time to answer  technical questions, we always make time to fix bugs. If you've spotted something strange, please file an [issue](https://github.com/julianshapiro/libscore/issues).

Take a moment to thank Libscore's sponsors on Twitter: @[Stripe](https://twitter.com/stripe) and @[DigitalOcean](https://twitter.com/digitalocean)!

### API Server

The API server is run with node on port 3000, nginx uses a forward proxy to map it to port 80

```
cd libscore/api
forever start --watch -a -l /root/logs/forever.log -o /root/logs/out.log -e /root/logs/err.log api.js
```
