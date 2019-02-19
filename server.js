// import dependencies from npm
const Fastify = require('fastify');
const path = require('path');
const AutoLoad = require('fastify-autoload');
const uuidv4 = require('uuid/v4');
const nconf = require('nconf');
const jwt = require('fastify-jwt');

// create request ids
const createRequestId = () => uuidv4();

const createServer = (options) => {
    const { logSeverity } = options;
    // create the server
    const server = Fastify({
        ignoreTrailingSlash: true,
        logger: {
            genReqId: createRequestId,
            level: logSeverity
        }
    });

    // register the plugins, routes in this case
    server.register(AutoLoad, {
        dir: path.join(__dirname, 'api', 'routes')
    });

    server.register(jwt, {
        secret: nconf.get('secrets.jwt'),
    });

    // start the server
    server.listen(9000, (err) => {
        if (err) {
            server.log.error(err);
            console.log(err);
            process.exit(1);
        }
        server.log.info('Server Started');
    });
}

module.exports = {
    createServer
}