var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'logs';
        ch.assertExchange(ex, 'fanout', {durable: false});
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            console.log(` [*] Waiting for messages in ${q}.  CTRL+C to exit.`);
            ch.bindQueue(q.queue, ex, '');
            ch.consume(q.queue, function(msg) {
                console.log(` [x] ${msg.content.toString()}`);
            }, {noAck: true})
        });
    });
});