var virgilioActionCache = require('../../');
var virgilioCache = require('virgilio-redis').virgilioCache;

var options = {
    redis: {
        host: process.env.WERCKER_REDIS_HOST,
        port: process.env.WERCKER_REDIS_PORT
    },
    logger: {
        name: 'virgilio',
        streams: []
    }
};

var Virgilio = require('virgilio');
var virgilio = new Virgilio(options);

virgilio
    .loadModule(virgilioCache)
    .loadModule(virgilioActionCache)
    .defineAction('add', add, { cache: 1 });

virgilio.callCounter = 0;

function add(number1, number2) {
    virgilio.callCounter++;
    return number1 + number2;
}

module.exports = virgilio;
