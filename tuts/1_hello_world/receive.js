var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'hello';
        ch.assertQueue(q, {durable: false});
        console.log(` [*] Waiting for messages in ${q}.  CTRL+C to exit.`);
        ch.consume(q, function(msg) {
            console.log(` [x] Received ${msg.content.toString()}`);
        }, {noAck: true})
    });
});