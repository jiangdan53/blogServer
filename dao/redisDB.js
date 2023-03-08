const {createClient} = require('redis');
const { promisify } =require('util')
const client = createClient();
client.del('*')
exports.setAsync = promisify(client.set).bind(client)
exports.getAsync = promisify(client.get).bind(client)
exports.ketsAsync = promisify(client.keys).bind(client);