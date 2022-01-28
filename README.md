
# Notes Api
## Summary:
Api to palace application to manage notes, builded with nodeJs, graphql, mongoDb, Redis, webpack, docker y ci-cd
## Execution:
- You need a mongosDb container
```
docker run -d -e MONGO_INITDB_ROOT_USERNAME=dev -e MONGO_INITDB_ROOT_PASSWORD=123123123 -v $PWD/data:/data/db -v $PWD/data/logs:/var/logs/mongodb/ -p 5062:27017 mongo:5.0
```
- You need redis container
```
docker run -d -p 5063:6379 redis:6.2.6
```
- Old command dont use it
```
docker run -d -v $PWD/config/redis:/usr/local/etc/redis -p 5063:6379 redis:6.2.6 redis-server /usr/local/etc/redis/redis.conf
```
- Then execute
```
yarn dev
```