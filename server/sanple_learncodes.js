const error = this.closed ? new errors_1.PoolClosedError(this) : new errors_1.PoolClearedError(this);
^

PoolClosedError [MongoPoolClosedError]: Attempted to check out a connection from closed connection pool
at ConnectionPool.processWaitQueue (/Users/dhank/Documents/SargamScoreBoard/server/node_modules/mongodb/lib/cmap/connection_pool.js:520:45)
at ConnectionPool.close (/Users/dhank/Documents/SargamScoreBoard/server/node_modules/mongodb/lib/cmap/connection_pool.js:284:14)
at Server.destroy (/Users/dhank/Documents/SargamScoreBoard/server/node_modules/mongodb/lib/sdam/server.js:130:19)
at destroyServer (/Users/dhank/Documents/SargamScoreBoard/server/node_modules/mongodb/lib/sdam/topology.js:409:12)
at node:internal/util:442:7
at new Promise (<anonymous>)
at destroyServer (node:internal/util:428:12)
at /Users/dhank/Documents/SargamScoreBoard/server/node_modules/mongodb/lib/sdam/topology.js:212:56
at Function.from (<anonymous>)
at Topology.close (/Users/dhank/Documents/SargamScoreBoard/server/node_modules/mongodb/lib/sdam/topology.js:211:40) {
address: 'ac-1rr08qi-shard-00-02.ocshej5.mongodb.net:27017',
[Symbol(errorLabels)]: Set(0) {}
}